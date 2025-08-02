const express = require('express');
const { getAUser } = require('../../controllers/user/user');
const userRoutes = express.Router();

userRoutes.get('/:uid', getAUser);

module.exports = userRoutes;