const mongoose = require('mongoose');

// Users collection: stores user profile and gamification state
// Updated whenever user registers, unlocks a stage, earns coins/xp/badges, or toggles virtual trading
const userSchema = new mongoose.Schema({
    uid: String, // Firebase UID, never changes
    firstName: String, // Set at registration, editable later
    lastName: String, // Set at registration, editable later
    email: { type: String, unique: true, required: true }, // Firebase email
    phone: { type: String, unique: true, required: true },
    countryCode: String,
    gender: { type: String, enum: ['male', 'female'] },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Chosen once during onboarding
    coins: { type: Number, default: 0 }, // Updated after missions, trades, purchases, unlocks
    xp: { type: Number, default: 0 }, // Grows with usage and success
    currentStage: { type: mongoose.Schema.ObjectId, ref: 'Stage' }, // Increased when user unlocks new stage
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }], // Modified when badge is earned
    unlockedStrategies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Strategy' }], // Updated after strategy unlock
    joinedAt: { type: Date, default: Date.now },
    isPaidUser: { type: Boolean, default: false }, // Set true after successful payment
});

const userModal = mongoose.model('User', userSchema);
module.exports = userModal;
