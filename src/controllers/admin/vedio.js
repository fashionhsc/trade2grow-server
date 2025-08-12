const videoModal = require("../../models/video");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");


exports.createVideo = tryCatch(async (req, res, next) => {
    const { title, url, thumbnail, duration, category } = req.body;

    if (!title || !url || !category) {
        return next(new ErrorClass('Title, URL, and Stage ID are required', 400));
    }

    const video = await videoModal.create({
        title, url, thumbnail, duration, category
    });

    res.status(201).json({ success: true, video });
});

exports.getAllVideos = tryCatch(async (req, res) => {
    const videos = await videoModal.find().sort({ order: 1 }).populate('category');
    res.json({ success: true, videos });
});

exports.getSingleVideo = tryCatch(async (req, res, next) => {
    const video = await videoModal.findById(req.params.id);
    if (!video) return next(new ErrorClass('Video not found', 404));
    res.json({ success: true, video });
});

exports.updateVideo = tryCatch(async (req, res, next) => {
    const video = await videoModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return next(new ErrorClass('Video not found', 404));
    res.json({ success: true, video });
});

exports.deleteVideo = tryCatch(async (req, res, next) => {
    const deleted = await videoModal.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new ErrorClass('Video not found', 404));
    res.json({ success: true, message: 'Video deleted successfully' });
});
