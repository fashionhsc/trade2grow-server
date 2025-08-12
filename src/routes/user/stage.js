const express = require('express');
const { unlockStage } = require('../../controllers/user/stage');
const userStageRoutes = express.Router();

userStageRoutes.post('/unlock-stage', unlockStage)

module.exports = userStageRoutes;