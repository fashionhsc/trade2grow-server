const express = require('express');
const { firebaseLogin } = require('../controllers/auth');
const authRoutes = express.Router();

authRoutes.post('/firebase', firebaseLogin)

module.exports = authRoutes;