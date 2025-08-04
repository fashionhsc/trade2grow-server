const userModal = require("../models/user");
const ErrorClass = require("./errorClass");
const tryCatch = require("./tryCatch");


exports.isEmailExist = tryCatch(async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(new ErrorClass('email is required', 400));

    const isEmailExist = await userModal.findOne({ email });
    if (!isEmailExist) return res.status(200).json({ success: true, message: 'Email not found' });
    return res.status(400).json({ success: false, message: 'Email already exist' })
})