const stageModal = require("../../models/stage");
const videoModal = require("../../models/video");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");
const crypto = require('crypto');
const NodeCache = require('node-cache');
const tempUrlCache = new NodeCache({ stdTTL: 120 });
const cloudinary = require('cloudinary');


exports.createVideo = tryCatch(async (req, res, next) => {
    const { title, url, thumbnail, duration, category, stageId } = req.body;

    if (!title || !url || !category) {
        return next(new ErrorClass('Title, URL, and Stage ID are required', 400));
    }

    const newVideo = await videoModal.create({
        title, url, thumbnail, duration, category
    });


    if (stageId) {
        await stageModal.findByIdAndUpdate(stageId, { $push: { videos: newVideo._id } });
    }

    res.status(201).json({ success: true, newVideo });
});

exports.getAllVideos = tryCatch(async (req, res) => {
    const videos = await videoModal.find().sort({ order: 1 }).populate('category');
    res.json({ success: true, videos });
});

exports.getSingleVideo = tryCatch(async (req, res, next) => {
    const video = await videoModal.findById(req.params.id);
    if (!video) return next(new ErrorClass('Video not found', 404));

    const token = crypto.randomBytes(16).toString('hex');
    tempUrlCache.set(token, video.public_id);

    res.json({ success: true, token });
});

exports.streamVideo = tryCatch(async (req, res, next) => {
    const publicId = tempUrlCache.get(req.params.token);
    if (!publicId) return next(new ErrorClass('Link expired or invalid', 403));

    const secureUrl = cloudinary.url(publicId, {
        resource_type: 'video',
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + 120 // 2 min
    });

    res.redirect(secureUrl);
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
