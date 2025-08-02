const mongoose = require('mongoose');

/**
 * StageVideo schema
 * - Stores educational video data for each stage
 * - Only admin can insert/update/delete
 * - Each stage can have multiple videos, sorted by `order`
 */
const stageVideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    stageId: { type: Number, required: true, ref: 'Stage' },                 // Foreign key to Stage._id — used to group videos by stage
    url: { type: String, required: true },                 // Full-length version
    previewUrl: String,              // 10-second version
    duration: Number,                // Full video duration in seconds
    thumbnail: String,                // Optional thumbnail or poster
    restrictedPreview: {
        type: Boolean, default: false, // flag value to show all vedios initially then check in frontend if user paid then it is not neccessary
    },
    order: {
        type: Number, default: 0,// Display order inside the stage (like sorting chapters)
    },
});

// Enforce unique order within the same stage
stageVideoSchema.index({ stageId: 1, order: 1 }, { unique: true });

const StageVideoModal = mongoose.model('StageVideo', stageVideoSchema);
module.exports = StageVideoModal;