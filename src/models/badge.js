const mongoose = require('mongoose');

// Badges collection: unlockable achievements
// Read when awarding badge, added to user.badges
const badgeSchema = new mongoose.Schema({
    name: String,
    description: String, // Tooltip info
    icon: String, // Image URL
    criteria: Object // System-defined triggers (e.g. { stage: 3, xp: 1000 })
});

const badgeModal = mongoose.model('Badge', badgeSchema);
module.exports = badgeModal;
