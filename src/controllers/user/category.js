const categoryModal = require("../../models/category");
const tryCatch = require("../../utils/tryCatch");




// Get All Categories
exports.getAllCategoriesForUser = tryCatch(async (req, res, next) => {
    const categories = await categoryModal.find();
    res.status(200).json({ success: true, categories });
});