const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");



exports.uploadImageFile = tryCatch(async (req, res, next) => {
    if (!req.file) return next(new ErrorClass(`No file uploaded`, 400))

    res.status(200).json({ url: req.file.path, public_id: req.file.filename });

});

exports.uploadVideoFile = tryCatch(async (req, res, next) => {
    if (!req.file) return next(new ErrorClass(`No file uploaded`, 400))

    res.status(200).json({ url: req.file.path, public_id: req.file.filename });

});