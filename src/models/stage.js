const mongoose = require('mongoose');

// Stages collection: fixed journeys for Trader, Investor, Hedger
// Static content, only admin can modify. Queried to display unlock content & requirements.
const stageSchema = new mongoose.Schema({
    stageId: Number,
    name: String, // Stage name
    description: String, // Shown in UI
    requiredCoins: Number, // Coins needed to unlock
    difficultyLevel: String, // Difficulty tag
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    rewards: {
        coins: Number, // Awarded upon unlock
        xp: Number,    // XP gain
    }
});

const stageModal = mongoose.model('Stage', stageSchema);
module.exports = stageModal;
