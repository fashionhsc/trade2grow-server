const UserModal = require("../models/user");
const ErrorClass = require("../utils/errorClass");
const tryCatch = require("../utils/tryCatch");
const jwt = require('jsonwebtoken');

exports.greetings = tryCatch(async (req, res, next) => {
    return res.status(200).json({ success: true, message: "Hi Trade2Grow" });
})

exports.getAUser = tryCatch(async (req, res, next) => {
    const { uid } = req.params;
    const checkUser = await UserModal.findOne({ uid });
    if (!checkUser) return next(new ErrorClass('User not found', 404));
    const token = await jwt.sign(checkUser.toObject(), process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: false }).json({ success: true, user });
})