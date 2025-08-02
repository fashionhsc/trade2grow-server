const express = require('express');
const { firebaseLoginPhone, logout, firebaseLoginGoogle, firebaseRegisterPhone, firebaseRegisterGoogle, manualLogin, manualSignup } = require('../controllers/auth');
const { authMiddleware } = require('../middlewares/auth');
const authRoutes = express.Router();


authRoutes.get('/greet', greetings);

authRoutes.post('/firebaseLoginPhone', firebaseLoginPhone)
authRoutes.post('/firebaseRegisterPhone', firebaseRegisterPhone)
authRoutes.post('/firebaseRegisterGoogle', firebaseRegisterGoogle)
authRoutes.post('/firebaseLoginGoogle', firebaseLoginGoogle)
authRoutes.post('/login', manualLogin)
authRoutes.post('/register', manualSignup)
authRoutes.post('/logout', logout)
authRoutes.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({ success: true, message: 'User is authenticated', user });
});

module.exports = authRoutes;