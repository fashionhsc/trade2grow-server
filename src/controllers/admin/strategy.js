const strategyModal = require("../../models/strategy");
const tryCatch = require("../../utils/tryCatch");


exports.createStrategy = tryCatch(async (req, res, next) => {
    const strategy = await strategyModal.create(req.body);
    return res.json({ success: true, strategy });
});


exports.getAllStrategy = tryCatch(async (req, res, next) => {
    const strategy = await strategyModal.find({}).populate('createdBy').populate('category');
    return res.json({ success: true, strategy });
});


exports.updateStrategy = tryCatch(async (req, res, next) => {
    const strategy = await strategyModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, strategy });
});


exports.deleteStrategy = tryCatch(async (req, res, next) => {
    await strategyModal.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Deleted successfully' });
});

