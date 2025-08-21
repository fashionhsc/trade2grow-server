const express = require('express');
const { unlockStage } = require('../../controllers/user/stage');
const { getStages } = require('../../controllers/admin/stage');
const userStageRoutes = express.Router();

userStageRoutes.post('/unlock-stage', unlockStage)
userStageRoutes.post('/get', getStages);


module.exports = userStageRoutes;