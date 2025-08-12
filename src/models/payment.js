const mongoose = require('mongoose');

// Payments: for onboarding or in-app purchases
// Inserted upon order creation and updated on payment success/failure via webhook or response
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage' },
    amount: Number, // ₹500 or more
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    provider: String, // razorpay, stripe, etc.
    orderId: String, // Razorpay order ID
    paymentId: String, // Razorpay payment ID
    receipt: String,
    createdAt: { type: Date, default: Date.now }
});

const paymentModal = mongoose.model('Payment', paymentSchema);
module.exports = paymentModal;
