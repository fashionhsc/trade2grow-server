const UserModal = require("../../models/user");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");
const jwt = require('jsonwebtoken');

exports.greetings = tryCatch(async (req, res, next) => {
    return res.status(200).json({ success: true, message: "Hi Trade2Grow" });
})

exports.getAUser = tryCatch(async (req, res, next) => {
    const { uid } = req.params;
    if (!uid) return next(new ErrorClass('Invalid UID', 400));
    const user = await UserModal.findOne({ uid })
        .populate('badges')
        .populate('unlockedStrategies')
        .populate('currentStage')

    if (!user) return next(new ErrorClass('User not found', 404));

    return res.status(200).json({ success: true, user });
})