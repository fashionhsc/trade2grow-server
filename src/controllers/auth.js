const UserModal = require("../models/user");
const splitPhoneNumber = require("../utils/splitNumber");
const tryCatch = require("../utils/tryCatch");
const jwt = require('jsonwebtoken');


exports.firebaseLogin = tryCatch(async (req, res, next) => {
    let { uid, phoneNumber: phone } = req.body;
    let { countryCode, phoneNumber } = splitPhoneNumber(phone);
    let user = await UserModal.findOne({ uid });
    let code = 200;
    if (!user) {
        let displayName, email;
        user = await UserModal.create({ uid, phoneNumber, countryCode, displayName, email });
        code = 201
    }
    const token = await jwt.sign(user.toObject(), process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: false }).json({ success: true, user, message: 'Logged in successfully' });
})


exports.logout = tryCatch(async (req, res) => {
    res.clearCookie('token').json({ success: true, message: 'User logged out successfully' });
})


