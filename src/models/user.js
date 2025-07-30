const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    countryCode: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true })


const UserModal = mongoose.model('User', UserSchema);
module.exports = UserModal;