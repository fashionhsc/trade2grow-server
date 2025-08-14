const mongoose = require('mongoose');

/**
 * Video schema
 * - Stores educational video data for each stage
 * - Only admin can insert/update/delete
 * - Each stage can have multiple videos, sorted by `order`
 */
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },                 // Full-length version
    previewUrl: String,              // 10-second version
    duration: Number,                // Full video duration in seconds
    thumbnail: String,                // Optional thumbnail or poster
    category: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true },
    public_id: { type: String }
});


const videoModal = mongoose.model('Video', videoSchema);
module.exports = videoModal;