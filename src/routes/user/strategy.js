const express = require('express');
const { authMiddleware } = require('../../middlewares/auth');
const { getAll } = require('../../controllers/user/strategy');
const userStrategyRoutes = express.Router();

userStrategyRoutes.use(authMiddleware);

userStrategyRoutes.get('/getAll', getAll);

module.exports = userStrategyRoutes;