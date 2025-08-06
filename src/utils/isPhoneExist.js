const userModal = require("../models/user");
const ErrorClass = require("./errorClass");
const tryCatch = require("./tryCatch");


exports.isPhoneExist = tryCatch(async (req, res, next) => {
    const { phone } = req.body;
    if (!phone) return next(new ErrorClass('Phone is required', 400));

    const isphoneExist = await userModal.findOne({ phone });
    if (!isphoneExist) return res.status(200).json({ success: true, message: 'Phone not found' });
    return res.status(400).json({ success: false, message: 'Phone already exist' })
})