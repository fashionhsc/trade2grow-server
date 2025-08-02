const mongoose = require('mongoose');

// Stages collection: fixed journeys for Trader, Investor, Hedger
// Static content, only admin can modify. Queried to display unlock content & requirements.
const stageSchema = new mongoose.Schema({
    _id: Number, // Stage number (1 to 5), used directly by app logic
    name: String, // Stage name
    description: String, // Shown in UI
    requiredCoins: Number, // Coins needed to unlock
    difficultyLevel: String, // Difficulty tag
    category: String, // Matches user's category
    videos: { type: mongoose.Schema.Types.ObjectId, ref: 'StageVideo' },
    rewards: {
        coins: Number, // Awarded upon unlock
        xp: Number,    // XP gain
        badges: [String] // Badge names to award
    }
});

const stageModal = mongoose.model('Stage', stageSchema);
module.exports = stageModal;
