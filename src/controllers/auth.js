const ErrorClass = require("../utils/errorClass");
const tryCatch = require("../utils/tryCatch");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require("../logger");
const userModal = require("../models/user");
const leaderBoardModal = require("../models/leaderboard");
const { sendOtpEmail } = require("../services/mailerService");
const otpModal = require("../models/otp");
const { generateOtp, splitPhoneNumber } = require("../utils/common");

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
};

const generateToken = async (user) => {
    try {
        const token = await jwt.sign(user.toObject(), process.env.SECRET_KEY, { expiresIn: '1d' });
        return token;
    } catch (error) {
        logger.error('generateToken error:', error);
    }
};

const addToLeaderBoard = async (user) => {
    try {
        return await leaderBoardModal.create({
            userId: user._id,
            username: user.username,
            category: user.category,
            coins: 0,
            xp: 0,
            currentStage: user.currentStage,
        });
    } catch (error) {
        logger.error('Leaderboard creation error:', error);
    }
};

// --- FIREBASE Register (Phone) ---
exports.firebaseRegisterPhone = tryCatch(async (req, res, next) => {
    let { phone: fullPhone, firstName, lastName, email, category } = req.body;
    if (!fullPhone || !firstName || !lastName || !email || !category) return next(new ErrorClass('All fields are required', 400));
    let { countryCode, phone } = splitPhoneNumber(fullPhone);
    const user = new userModal({
        uid: req.body.uid || '',
        phone,
        countryCode,
        firstName,
        lastName,
        email,
        category,
    });
    await user.save();
    await user.populate('category');
    await addToLeaderBoard(user);
    const token = await generateToken(user);
    res.status(201).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Signed in successfully' });
})

// --- FIREBASE LOGIN (Phone) ---
exports.firebaseLoginPhone = tryCatch(async (req, res, next) => {
    let { uid, phoneNumber } = req.body;
    if (!uid) return next(new ErrorClass('All fields are required', 400));
    let user;
    if (phoneNumber) {
        let { countryCode, phone } = splitPhoneNumber(phoneNumber);
        user = await userModal.findOne({ phone }).populate('category').populate('currentStage');
    } else {
        user = await userModal.findOne({ uid }).populate('category').populate('currentStage');
    }
    if (!user) {
        return next(new ErrorClass('user not found', 404));
    }
    const token = await generateToken(user);
    res.status(200).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Logged in successfully' });
})

// --- FIREBASE Register (Google) ---
exports.firebaseRegisterGoogle = tryCatch(async (req, res, next) => {
    let { uid, email, displayName, category, phoneNumber: fullPhone } = req.body;
    if (!uid || !displayName || !email || !category) return next(new ErrorClass('All fields are required', 400));
    if (fullPhone) ({ countryCode, phoneNumber } = splitPhoneNumber(fullPhone))
    user = await userModal.create({ uid, phoneNumber, countryCode, username: displayName, email, category });
    await addToLeaderBoard(user);
    const token = await generateToken(user);
    res.status(201).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Logged in successfully' });
})
// --- FIREBASE LOGIN (Google) ---
exports.firebaseLoginGoogle = tryCatch(async (req, res, next) => {
    let { uid } = req.body;
    let user = await userModal.findOne({ uid }).populate('category').populate('currentStage');
    if (!user) {
        return next(new ErrorClass('user not found', 404));
    }
    const token = await generateToken(user);
    res.status(201).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Logged in successfully' });
})


exports.manualSignup = tryCatch(async (req, res, next) => {
    const { email, password, firstName, lastName, category } = req.body;
    if (!email || !password || !firstName || !lastName || !category) return next(new ErrorClass('All fields required', 400));

    const hashed = await bcrypt.hash(password, 12);
    const user = await userModal.create({ email, firstName, lastName, password: hashed, category });
    await addToLeaderBoard(user);

    const token = await generateToken(user);
    res.status(201).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Signup successful' });
});

exports.manualLogin = tryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorClass('All fields required', 400));

    const user = await userModal.findOne({ email }).populate('category').populate('currentStage');
    if (!user) return next(new ErrorClass('User not found', 404));

    // const match = await bcrypt.compare(password, user.password);
    // if (!match) return next(new ErrorClass('Invalid credentials', 401));

    const token = await generateToken(user);
    res.status(200).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Logged in successfully' });
});


exports.sendOtp = tryCatch(async (req, res) => {
    const { email } = req.body;

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    if (!email || !otp || !expiresAt) return next(new ErrorClass('Error occured while sending OTP', 400));
    await otpModal.deleteMany({ email }); // cleanup previous OTPs
    await otpModal.create({ email, otp, expiresAt });

    await sendOtpEmail(email, otp);

    res.status(200).json({ success: true, message: 'OTP sent to email' });

});

exports.verifyOtp = tryCatch(async (req, res, next) => {
    const { email, fullOtp } = req.body;
    if (!email || !fullOtp) return next(new ErrorClass('All fields are required', 400));

    const record = await otpModal.findOne({ email, otp: fullOtp });
    if (!record) return next(new ErrorClass('Invalid OTP', 400))

    if (record.expiresAt < new Date()) {
        await otpModal.deleteOne({ _id: record._id });
        return next(new ErrorClass('OTP expired', 400));
    }

    await otpModal.deleteOne({ _id: record._id });
    const user = await userModal.findOne({ email }).populate('category').populate('currentStage');
    if (!user) return res.json({ success: false, message: 'user not found' });
    const token = await generateToken(user);
    res.status(200).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'OTP verified' });
});



exports.logout = tryCatch(async (req, res) => {
    res.clearCookie('token', COOKIE_OPTIONS).json({ success: true, message: 'User logged out successfully' });
})


