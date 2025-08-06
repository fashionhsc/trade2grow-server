const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expiresAt: Date,
});

const otpModal = mongoose.model('Otp', otpSchema);
module.exports = otpModal;
