const express = require('express');
const uploadVideo = require('../../middlewares/uploadVideo');
const uploadImage = require('../../middlewares/uploadImage');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth');
const { uploadVideoFile, uploadImageFile } = require('../../controllers/admin/upload');
const uploadRoutes = express.Router();
uploadRoutes.use(authMiddleware, roleMiddleware('admin'));

uploadRoutes.post('/video',  uploadVideo.single('video'), uploadVideoFile);
uploadRoutes.post('/thumbnail',  uploadImage.single('thumbnail'), uploadImageFile);

module.exports = uploadRoutes;
