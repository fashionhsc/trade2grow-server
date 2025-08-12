const mongoose = require('mongoose');

// Leaderboard: ranked users per category
// Updated every time user gains coins or XP (after stage unlock, mission complete, etc.)
const leaderboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    coins: Number,
    xp: Number,
    lastUpdated: { type: Date, default: Date.now } // Used to sort leaderboard freshness
});

const leaderBoardModal = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = leaderBoardModal;
