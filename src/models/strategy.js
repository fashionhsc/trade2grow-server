const mongoose = require('mongoose');


// Strategy collection: available trading plans by category
// Shown per user path & stage. Added manually or by admin.
const strategySchema = new mongoose.Schema({
    title: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Matches user category
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin or user
    description: String, // Strategy summary
    difficulty: String, // Easy, Medium, Hard
    requiredStage: Number, // Min stage to unlock
    tags: [String], // Strategy tags for search/filter
    isAutoTradeEnabled: Boolean, // Used by frontend to allow Angel One trading
    simulationAllowed: Boolean, // Whether virtual trade is allowed
    createdAt: { type: Date, default: Date.now }
});


const strategyModal = mongoose.model('Strategy', strategySchema);
module.exports = strategyModal;