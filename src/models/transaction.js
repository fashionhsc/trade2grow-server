const mongoose = require('mongoose');

// Logs all coin transactions
// Created whenever user earns/spends coins (unlock, reward, referral, etc.)
const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['earn', 'spend'] },
    amount: Number,
    reason: String, // Description of action
    createdAt: { type: Date, default: Date.now }
});

const transactionModal = mongoose.model('Transaction', transactionSchema);
module.exports = transactionModal;