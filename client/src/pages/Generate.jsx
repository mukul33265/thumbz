import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackgroundEffect from "../components/background";
import AspectRatioSelector from "../components/aspectRatio";
import StyleSelector from "../components/styleSelector";
import ColorScheme from "../components/colorScheme";
import PreviewPanel from "../components/previewPanel";
import api from "../configs/api";
import { toast } from "react-hot-toast";

export default function Generate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [additionDetails, setAdditionalDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [colorScheme, setColorScheme] = useState("Sunset");

  const handleGenerate = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/thumbnail/generate", {
        title,
        prompt: additionDetails,
        style: selectedStyle,
        aspect_ratio: selectedRatio,
        color_scheme: colorScheme,
        text_overlay: true,
      });

      if (response.data.success) {
        setThumbnail(response.data.thumbnail);
        toast.success("Thumbnail generated successfully!");
      } else {
        toast.error(response.data.message || "Failed to generate thumbnail");
      }
    } catch (error) {
      console.error("Generation error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate thumbnail. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchThumbnail = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await api.get(`/api/user/thumbnail/${id}`);
      if (response.data.thumbnail) {
        setThumbnail(response.data.thumbnail);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch thumbnail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchThumbnail();
    }
  }, [id]);

  return (
    <>
      <BackgroundEffect>
        <div className=" p-10">
          {/* Main container */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.7fr] gap-8">
            {/* Left Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h2 className="text-white text-2xl font-bold mb-2">
                Create Your Thumbnail
              </h2>
              <p className="text-gray-400 mb-6">
                Describe your vision and let AI bring it to life
              </p>

              {/* title and topic*/}
              <div>
                <label className="text-gray-300 text-sm">Title or Topic</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  maxLength={100}
                  placeholder="e.g. 10 Tips for Better Sleep"
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 
                        border border-white/10 text-white 
              focus:ring-2 focus:ring-purple-500/40
                        placeholder-gray-500 focus:outline-none "
                />
                <div className="mt-2 text-gray-400 text-right">
                  <span>{title.length}/100</span>
                </div>
              </div>

              {/* Aspect Ratio */}
              <AspectRatioSelector
                selectedRatio={selectedRatio}
                setSelectedRatio={setSelectedRatio}
              />

              {/* sytle selector */}
              <StyleSelector
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
              ></StyleSelector>

              {/* color scheme selector */}
              <ColorScheme
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
              />

              {/* addition prompt */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Additional Prompts{" "}
                  <span className="text-zinc-400 text-xs">
                    (optionals)
                  </span>{" "}
                </label>
                <textarea
                  rows={3}
                  className="w-full mt-1 p-3 rounded-lg 
             bg-white/5 border border-white/10 
             text-white placeholder-gray-500 
             focus:outline-none focus:ring-2 
             focus:ring-purple-500/40 
             resize-none"
                  placeholder="Add any specific element, mood, or style preference...."
                  value={additionDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />
              </div>

              {/*  generate thumbnail button */}
              {!id && (
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full mt-6 mb-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-500 disabled:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Generating..." : "Generate Thumbnail"}
                </button>
              )}
            </div>

            {/* Right Card */}
            <PreviewPanel
              thumbnail={thumbnail}
              loading={loading}
              selectedRatio={selectedRatio}
            />
          </div>
        </div>
      </BackgroundEffect>
    </>
  );
}
