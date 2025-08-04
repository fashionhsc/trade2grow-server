const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth');
const { createVideo, getAllVideos, getSingleVideo, updateVideo, deleteVideo } = require('../../controllers/admin/vedio');
const adminVedioRoutes = express.Router();

adminVedioRoutes.use(authMiddleware, roleMiddleware('admin'));

adminVedioRoutes.post('/create', createVideo);
adminVedioRoutes.get('/all', getAllVideos);
adminVedioRoutes.get('/single/:id', getSingleVideo);
adminVedioRoutes.put('/update/:id', updateVideo);
adminVedioRoutes.delete('/delete/:id', deleteVideo);

module.exports = adminVedioRoutes;
