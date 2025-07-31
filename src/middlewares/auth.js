const logger = require("../logger");
const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ success: false, message: "You are not authenticated" });
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) return res.status(401).json({ success: false, message: "Invalid token" });
        req.user = decoded;
        next();
    } catch (error) {
        logger.error(error)
        return res.status(401).json({ success: false, message: "Authentication failed" });
    }
};