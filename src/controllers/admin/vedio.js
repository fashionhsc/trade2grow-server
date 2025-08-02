const StageVideoModal = require("../../models/stageVideo");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");


exports.createVideo = tryCatch(async (req, res, next) => {
    const { title, url, stageId, thumbnail, duration, restrictedPreview, order } = req.body;

    if (!title || !url || !stageId) {
        return next(new ErrorClass('Title, URL, and Stage ID are required', 400));
    }

    const video = await StageVideoModal.create({
        title, url, stageId, thumbnail, duration, restrictedPreview, order
    });

    res.status(201).json({ success: true, video });
});

exports.getAllVideos = tryCatch(async (req, res) => {
    const videos = await StageVideoModal.find().sort({ stageId: 1, order: 1 });
    res.json({ success: true, videos });
});

exports.getSingleVideo = tryCatch(async (req, res, next) => {
    const video = await StageVideoModal.findById(req.params.id);
    if (!video) return next(new ErrorClass('Video not found', 404));
    res.json({ success: true, video });
});

exports.updateVideo = tryCatch(async (req, res, next) => {
    const video = await StageVideoModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return next(new ErrorClass('Video not found', 404));
    res.json({ success: true, video });
});

exports.deleteVideo = tryCatch(async (req, res, next) => {
    const deleted = await StageVideoModal.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new ErrorClass('Video not found', 404));
    res.json({ success: true, message: 'Video deleted successfully' });
});
