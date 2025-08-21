const UserModal = require("../../models/user");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");
const jwt = require('jsonwebtoken');

exports.getAUser = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    if (!id) return next(new ErrorClass('Invalid id', 400));
    const user = await UserModal.findOne({ _id: id }).populate('category').populate({
            path: 'currentStage',
            populate: {
                path: 'videos',
                model: 'Video'
            },
        });

    if (!user) return next(new ErrorClass('User not found', 404));

    return res.status(200).json({ success: true, user });
})