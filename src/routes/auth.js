const express = require('express');
const { firebaseLogin, logout } = require('../controllers/auth');
const { authMiddleware } = require('../middlewares/auth');
const authRoutes = express.Router();

authRoutes.post('/firebase', firebaseLogin)
authRoutes.post('/logout', logout)
authRoutes.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({ success: true, message: 'User is authenticated', user });
});

module.exports = authRoutes;