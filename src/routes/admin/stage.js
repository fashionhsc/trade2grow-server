const express = require('express');
const { createStage, getStages, updateStage } = require('../../controllers/admin/stage');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth');
const adminStageRoutes = express.Router();

adminStageRoutes.use(authMiddleware, roleMiddleware('admin'))

adminStageRoutes.post('/create', createStage);
adminStageRoutes.get('/get/:id', getStages);
adminStageRoutes.get('/get', getStages);
adminStageRoutes.put('/update/:id', updateStage);
adminStageRoutes.delete('/delete/:id', updateStage);


module.exports = adminStageRoutes;