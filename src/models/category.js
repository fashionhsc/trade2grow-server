const mongoose = require('mongoose');

/**
 * Categories for user onboarding and stage mapping.
 * Admin-defined, and can evolve over time (e.g., add "Crypto", "Forex", etc.)
 */
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // prevent duplicate categories like "Trader"
    },
    description: String, // For admin to show details during selection
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const categoryModal = mongoose.model('Category', categorySchema);
module.exports = categoryModal;
