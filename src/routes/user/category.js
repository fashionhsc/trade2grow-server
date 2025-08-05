const express = require('express');
const { getAllCategoriesForUser } = require('../../controllers/user/category');
const userCategory = express.Router();


userCategory.get('/user', getAllCategoriesForUser);


module.exports = userCategory;