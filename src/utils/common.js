const userModal = require("../models/user");
const ErrorClass = require("./errorClass");
const tryCatch = require("./tryCatch");

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const isEmailExist = tryCatch(async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(new ErrorClass('email is required', 400));

    const isEmailExist = await userModal.findOne({ email });
    if (!isEmailExist) return res.status(200).json({ success: true, message: 'Email not found' });
    return res.status(400).json({ success: false, message: 'Email already exist' })
})



const isPhoneExist = tryCatch(async (req, res, next) => {
    const { phone } = req.body;
    if (!phone) return next(new ErrorClass('Phone is required', 400));

    const isphoneExist = await userModal.findOne({ phone });
    if (!isphoneExist) return res.status(200).json({ success: true, message: 'Phone not found' });
    return res.status(400).json({ success: false, message: 'Phone already exist' })
})

const splitPhoneNumber = (fullPhoneNumber) => {
    const match = fullPhoneNumber.match(/^(\+\d{1,4})(\d{10,})$/);
    if (!match) return { countryCode: '', phoneNumber: '' };

    return {
        countryCode: match[1],     // e.g. "+91"
        phone: match[2],     // e.g. "8800784843"
    };
}


module.exports = { generateOtp, isEmailExist, isPhoneExist, splitPhoneNumber };


