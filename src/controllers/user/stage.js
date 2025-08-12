const ActivityFeedModal = require("../../models/badge");
const leaderBoardModal = require("../../models/leaderboard");
const paymentModal = require("../../models/payment");
const stageModal = require("../../models/stage");
const userModal = require("../../models/user");
const UserProgressModal = require("../../models/userProgress");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");


exports.unlockStage = tryCatch(async (req, res, next) => {

    const { _id } = req.body;
    if (!_id) return next(new ErrorClass('_id is invalid', 400));

    const user = await userModal.findById(_id).populate('currentStage');
    if (!user) return next(new ErrorClass('User not found', 404));

    let nextStage;

    if (!user.currentStage) {
        // Onboarding case → Unlock Stage 1
        nextStage = await stageModal.findOne({ stageId: 1, category: user.category });
    } else {
        // Unlock the stage after the current one
        nextStage = await stageModal.findOne({
            stageId: user.currentStage.stageId + 1,
            category: user.category
        });
    }

    if (!nextStage) return next(new ErrorClass('No next stage found. Possibly last stage reached.', 404));

    // Reward user
    user.coins += nextStage.rewards.coins || 0;
    user.xp += nextStage.rewards.xp || 0;
    user.currentStage = nextStage.id;

    // Set paid status (if payment unlocks paid tier)
    user.isPaidUser = true;

    await user.save();

    await leaderBoardModal.updateOne(
        { userId: _id },
        {
            $set: {
                username: user.username,
                category: user.category,
                coins: user.coins,
                xp: user.xp,
                lastUpdated: new Date()
            }
        },
        { upsert: true }
    );

    res.send({ success: true, message: 'Stage unlocked', user });
})