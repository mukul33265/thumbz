const { InferenceClient } = require("@huggingface/inference");
const Thumbnail = require("../models/Thumbnail");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const client = new InferenceClient(process.env.HF_TOKEN);

const generateThumbnail = async (req, res) => {
  try {
    const { userId } = req.session;

    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    // 🔥 Enhanced Prompt
    const enhancedPrompt = `
      Create a high-quality YouTube thumbnail.
      Title: ${title}
      Style: ${style}
      Color Scheme: ${color_scheme}
      Aspect Ratio: ${aspect_ratio}
      Text Overlay: ${text_overlay ? "Include bold catchy text" : "No text"}
      User Idea: ${user_prompt}
      Make it eye-catching, cinematic lighting, high contrast,
      professional, vibrant, sharp details, 4K quality.
    `;

    // Save DB record
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: enhancedPrompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    // 🚀 Generate Image using SDXL + nscale
    const imageBlob = await client.textToImage({
      provider: "nscale",   // ✅ changed provider
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: enhancedPrompt,
      parameters: {
        num_inference_steps: 25,
        guidance_scale: 7.5,
      },
    });

    // Convert Blob → Buffer
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ☁️ Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `thumbnails/${userId}`,
            transformation: [
              { width: 1280, height: 720, crop: "fill" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // ✅ FIXED BUG (you forgot imageUrl before)
    thumbnail.image_url = uploadResult.secure_url;
    thumbnail.public_id = uploadResult.public_id;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    return res.status(200).json({
      success: true,
      thumbnail,
    });

  } catch (error) {
    console.error("Thumbnail Generation Error:", error.message);
    console.error("Full Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Thumbnail generation failed",
    });
  }
};

const deleteThumbnail = async(req,res) => {
    try{
        const {userId} = req.session ;
        const {id} = req.params;
        await Thumbnail.findByIdAndDelete({_id:id,userId});

        res.json({message : 'Thumbnail deleted successfully'});


    }
    catch(error){
        console.log(error);
        res.status(500).json({message : error.message})
    }
}

module.exports = { generateThumbnail , deleteThumbnail};