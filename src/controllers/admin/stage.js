const stageModal = require("../../models/stage");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");

// CREATE a new stage
exports.createStage = tryCatch(async (req, res, next) => {
    const { stageId, name, description, requiredCoins, difficultyLevel, category, rewards, videos } = req.body;
    if (!stageId || !name || !description || !difficultyLevel || !category || !rewards || !videos) return next(new ErrorClass('All fields are required to create new stage', 400));

    const newStage = await stageModal.create({
        stageId,
        name,
        description,
        requiredCoins,
        difficultyLevel,
        category,
        rewards,
        videos
    });

    res.status(201).json({ success: true, stage: newStage });
})

// READ all stages or one stage by ID
exports.getStages = tryCatch(async (req, res) => {
    const { id } = req.params;
    const stages = id
        ? await stageModal.findById(id).populate('videos').populate('category')
        : await stageModal.find().sort({ _id: 1 }).populate('videos').populate('category');

    if (!stages) return next(new ErrorClass('Stage(s) not found', 404))
    res.json({ success: true, data: stages });
});



// UPDATE a stage by ID
exports.updateStage = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    if (!id) return next(new ErrorClass('id is required to update stage', 400));
    const updated = await stageModal.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updated) return next(new ErrorClass('Stage not found to update', 404));

    res.status(200).json({ success: true, message: 'Stage updated', stage: updated });
});


// DELETE a stage by ID
exports.deleteStage = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    if (!id) return next(new ErrorClass('id is required to delete stage', 400));
    const deleted = await stageModal.findByIdAndDelete(id);
    if (!deleted) return next(new ErrorClass('Stage not found to delete', 404));

    res.status(200).json({ success: true, message: 'Stage deleted' });
});