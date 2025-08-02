const mongoose = require('mongoose');

// Tracks user's completion and rewards for strategies
// Updated each time a user completes a strategy or stage unlocked
const userProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stageId: { type: Number, required: true, ref: 'Stage' }, // Which stage this belongs to
    strategyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Strategy' },
    status: String, // started / completed / failed
    watchedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StageVideo' }],
    startedAt: Date,
    completedAt: Date,
    coinsEarned: Number,
    xpEarned: Number
});


const UserProgressModal = mongoose.model('UserProgress', userProgressSchema);
module.exports = UserProgressModal;

