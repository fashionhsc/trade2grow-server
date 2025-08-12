const strategyModal = require("../../models/strategy");
const tryCatch = require("../../utils/tryCatch");



exports.getAll = tryCatch(async (req, res, next) => {
    const strategies = await strategyModal.find({ requiredStage: { $lte: req.user.stage }, category: req.user.category }).populate('category createdBy', 'name');
    res.json({ status: true, strategies });
})