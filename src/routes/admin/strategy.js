const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth');
const { createStrategy, getAllStrategy, updateStrategy, deleteStrategy } = require('../../controllers/admin/strategy');
const adminStrategyRoutes = express.Router();

adminStrategyRoutes.use(authMiddleware, roleMiddleware('admin'));

adminStrategyRoutes.post('/create', createStrategy);
adminStrategyRoutes.get('/getAllStrategy', getAllStrategy);
adminStrategyRoutes.put('/update/:id', updateStrategy);
adminStrategyRoutes.delete('/delete/:id', deleteStrategy);

module.exports = adminStrategyRoutes;
