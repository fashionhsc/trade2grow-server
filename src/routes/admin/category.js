const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../../controllers/admin/category');
const { uploadImage, setUploadFolder } = require('../../middlewares/uploadImage');
const adminCategoryRoutes = express.Router();


adminCategoryRoutes.use(authMiddleware, roleMiddleware('admin'))

adminCategoryRoutes.post('/create', setUploadFolder('categoryimage'), uploadImage.single('image'), createCategory);
adminCategoryRoutes.get('/all', getAllCategories);
adminCategoryRoutes.get('/single/:id', getCategoryById);
adminCategoryRoutes.put('/update/:id', setUploadFolder('categoryimage'), uploadImage.single('image'), updateCategory);


module.exports = adminCategoryRoutes;