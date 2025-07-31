const express = require('express');
const { greetings, getAUser } = require('../controllers/user');
const userRoutes = express.Router();

userRoutes.get('/greet', greetings)
userRoutes.get('/:uid', getAUser);

module.exports = userRoutes;