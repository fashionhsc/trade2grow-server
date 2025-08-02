const mongoose = require('mongoose');

// Missions: daily/weekly challenges for each category
// Updated daily via admin or automated CRON job
const missionSchema = new mongoose.Schema({
    category: String, // Trader / Investor / Hedger
    title: String, // Mission title
    description: String, // What to do
    type: String, // daily or weekly
    reward: {
        coins: Number, // Coins awarded
        xp: Number // XP awarded
    },
    createdAt: { type: Date, default: Date.now }
});

const missionModal = mongoose.model('Mission', missionSchema);
module.exports = missionModal;
