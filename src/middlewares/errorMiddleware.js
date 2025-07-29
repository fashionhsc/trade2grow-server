const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Internal Servver Error';
    err.code = err.code || 500;


    return res.status(code).json({ success: false, message: err.message });
}

module.exports = errorMiddleware;