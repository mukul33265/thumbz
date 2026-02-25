const Thumbnail = require("../models/thumbnail");


// controllers to get all user thumbnails
const getUsersThumbnails = async(req,res)=>{
    try{
        const {userId} = req.session;
        const thumbnail = await Thumbnail.find({userId});
        res.json({thumbnail});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : error.message})
    }
}

// controllers to get single user thumbnails
const getThumbnailById = async(req,res)=>{
    try{
        const {userId} = req.session;
        const {id} = req.params;

        const thumbnail = await Thumbnail.findOne({userId,_id:id});
        res.json({thumbnail});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : error.message})
    }
}

module.exports = {getUsersThumbnails,getThumbnailById}