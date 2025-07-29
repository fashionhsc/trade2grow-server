const express = require('express');
const { greetings } = require('../controllers/user');
const userRoutes = express.Router();

userRoutes.get('/greet', greetings)

module.exports = userRoutes;