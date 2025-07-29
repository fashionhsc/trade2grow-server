const tryCatch = require("../utils/tryCatch");

exports.greetings = tryCatch(async (req, res, next) => {
    return res.status(200).json({ success: true, message: "Hi Trade2Grow" });
})