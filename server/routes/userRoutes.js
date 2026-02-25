const express = require('express');
const { getUsersThumbnails, getThumbnailById } = require('../controllers/userController');
const { protect } = require("../middleware.js/auth");
const userRouter = express.Router();

userRouter.get('/thumbnails',protect,getUsersThumbnails); 
userRouter.get('/thumbnail/:id',protect,getThumbnailById);

module.exports = userRouter ;