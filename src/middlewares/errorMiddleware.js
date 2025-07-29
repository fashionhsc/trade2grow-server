const logger = require("../logger");

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Internal Servver Error';
    err.code = err.code || 500;
    logger.error(err.message);
    return res.status(code).json({ success: false, message: err.message });
}

module.exports = errorMiddleware;