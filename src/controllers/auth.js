const UserModal = require("../models/user");
const splitPhoneNumber = require("../utils/splitNumber");
const tryCatch = require("../utils/tryCatch");

exports.firebaseLogin = tryCatch(async (req, res, next) => {
    let { uid, phoneNumber: phone } = req.body;
    let { countryCode, phoneNumber } = splitPhoneNumber(phone);
    let user = await UserModal.findOne({ uid });
    let code = 200;
    if (!user) {
        user = await UserModal.create({ uid, phoneNumber, countryCode });
        code = 201
    }
    res.status(code).json({ success: true, user, message: 'Logged in successfully' });
})