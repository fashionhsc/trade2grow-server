const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../../controllers/admin/category');
const adminCategoryRoutes = express.Router();

adminCategoryRoutes.use(authMiddleware, roleMiddleware('admin'))

adminCategoryRoutes.post('/create', createCategory);
adminCategoryRoutes.get('/all', getAllCategories);
adminCategoryRoutes.get('/single/:id', getCategoryById);
adminCategoryRoutes.put('/update/:id', updateCategory);


module.exports = adminCategoryRoutes;