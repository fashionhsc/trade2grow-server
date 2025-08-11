const express = require('express');
const { authMiddleware } = require('../../middlewares/auth');
const userStrategyRoutes = express.Router();

userStrategyRoutes.use(authMiddleware);

userStrategyRoutes.get('/getAll', getAUser);

module.exports = userStrategyRoutes;