const ErrorClass = require("../utils/errorClass");
const splitPhoneNumber = require("../utils/splitNumber");
const tryCatch = require("../utils/tryCatch");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require("../logger");
const userModal = require("../models/user");
const leaderBoardModal = require("../models/leaderboard");

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
    let { uid, phoneNumber: fullPhone, username, email, category } = req.body;
    if (!uid || !fullPhone || !username || !email || !category) return next(new ErrorClass('All fields are required', 400));
    let { countryCode, phoneNumber } = splitPhoneNumber(fullPhone);
    user = await userModal.create({ uid, phoneNumber, countryCode, username, email, category });
    await addToLeaderBoard(user);
    const token = await generateToken(user);
    res.status(201).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Logged in successfully' });
})

// --- FIREBASE LOGIN (Phone) ---
exports.firebaseLoginPhone = tryCatch(async (req, res, next) => {
    let { uid } = req.body;
    if (!uid) return next(new ErrorClass('All fields are required', 400));
    let user = await userModal.findOne({ uid });
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
    let user = await userModal.findOne({ uid });
    if (!user) {
        return next(new ErrorClass('user not found', 404));
    }
    const token = await generateToken(user);
    res.status(201).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Logged in successfully' });
})


exports.manualSignup = tryCatch(async (req, res) => {
    const { email, password, username, category } = req.body;
    if (!email || !password || !username || !category) return next(new ErrorClass('All fields required', 400));

    const hashed = await bcrypt.hash(password, 12);
    const user = await userModal.create({ email, username, password: hashed, category });
    await addToLeaderBoard(user);

    const token = await generateToken(user);
    res.status(201).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Signup successful' });
});

exports.manualLogin = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorClass('All fields required', 400));

    const user = await userModal.findOne({ email });
    if (!user) return next(new ErrorClass('User not found', 404));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(new ErrorClass('Invalid credentials', 401));

    const token = await generateToken(user);
    res.status(200).cookie('token', token, COOKIE_OPTIONS).json({ success: true, user, message: 'Logged in successfully' });
});



exports.logout = tryCatch(async (req, res) => {
    res.clearCookie('token', COOKIE_OPTIONS).json({ success: true, message: 'User logged out successfully' });
})


