const categoryModal = require("../../models/category");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");

// Create Category
exports.createCategory = tryCatch(async (req, res, next) => {
    const { name, description } = req.body;
    if (!name) return next(new ErrorClass('Category name is required', 400));

    const exists = await categoryModal.findOne({ name });
    if (exists) return next(new ErrorClass('Category already exists', 409));

    const newCategory = await categoryModal.create({ name, description });
    res.status(201).json({ success: true, category: newCategory });
});

// Get All Categories
exports.getAllCategories = tryCatch(async (req, res, next) => {
    const categories = await categoryModal.find();
    res.status(200).json({ success: true, categories });
});

// Get Single Category by ID
exports.getCategoryById = tryCatch(async (req, res, next) => {
    const category = await categoryModal.findById(req.params.id);
    if (!category) return next(new ErrorClass('Category not found', 404));

    res.status(200).json({ success: true, category });
});

// Update Category
exports.updateCategory = async (req, res, next) => {
    try {
        const { ...updateData } = req.body;

        const updated = await categoryModal.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updated) return next(new ErrorClass('Category not found', 404));

        res.status(200).json({ success: true, category: updated });
    } catch (error) {
        // Check for Mongo duplicate key error
        if (error.code === 11000) {
            return next(new ErrorClass('Category name already exists', 409));
        }

        // Forward other unexpected errors
        return next(error);
    }
};

// Delete Category
exports.deleteCategory = tryCatch(async (req, res, next) => {
    const deleted = await categoryModal.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new ErrorClass('Category not found', 404));

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
});

