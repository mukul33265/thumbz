const express = require('express');
const { generateThumbnail, deleteThumbnail } = require('../controllers/thumbnailController');
const { protect } = require("../middleware.js/auth");

const ThumbnailRouter = express.Router();

ThumbnailRouter.post('/generate',protect,generateThumbnail);
ThumbnailRouter.delete('/delete/:id',protect,deleteThumbnail);

module.exports = ThumbnailRouter;