const express = require('express');
const { getAUser } = require('../../controllers/user/user');
const { authMiddleware } = require('../../middlewares/auth');
const userRoutes = express.Router();

userRoutes.use(authMiddleware);

userRoutes.get('/getSingleUser/:id', getAUser);

module.exports = userRoutes;