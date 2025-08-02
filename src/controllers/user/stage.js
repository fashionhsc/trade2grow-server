const ActivityFeedModal = require("../../models/badge");
const leaderBoardModal = require("../../models/leaderboard");
const paymentModal = require("../../models/payment");
const stageModal = require("../../models/stage");
const StageVideoModal = require("../../models/stageVideo");
const userModal = require("../../models/user");
const UserProgressModal = require("../../models/userProgress");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");


exports.unlockStage = tryCatch(async (req, res, next) => {
    const { stageId } = req.params;
    if (!stageId) return next(new ErrorClass('StageId is required', 400));

    const { uid, amount } = req.body;
    if (!uid || !amount) return next(new ErrorClass('uid or amount is invalid', 400));

    const user = await userModal.findOne({ uid });
    const stage = await stageModal.findById(stageId);
    if (!user || !stage) return next(new ErrorClass('User or stage not found', 404));

    const currentStage = stage._id - 1;

    // Check video completion
    const stageVideos = await StageVideoModal.find({ stageId: currentStage });
    const userProgress = await UserProgressModal.findOne({ userId: user._id, stageId: currentStage });

    const hasWatchedAll = stageVideos.every(video =>
        userProgress?.watchedVideos?.some(watched => watched.toString() === video._id.toString())
    );

    if (!hasWatchedAll) {
        return res.status(400).send('Please watch all videos to unlock next stage.');
    }


    const checkPayment = await paymentModal.findOne({ userId: user._id, status: 'success', amount });
    if (!checkPayment || user.coins < stage.requiredCoins) return next(new ErrorClass('Not enough coins or no payment found', 403));

    user.currentStage = Math.max(user.currentStage, stage._id);
    await user.save();

    await leaderBoardModal.updateOne(
        { userId: user._id },
        {
            $set: {
                username: user.username,
                category: user.category,
                coins: user.coins,
                xp: user.xp,
                currentStage: user.currentStage,
                lastUpdated: new Date()
            }
        },
        { upsert: true }
    );

    await UserProgressModal.updateOne(
        {
            userId: user._id,
            stageId: stage._id
        },
        {
            $setOnInsert: {
                startedAt: new Date(),
                status: 'in-progress'
            }
        },
        { upsert: true, new: true }
    )

    await ActivityFeedModal.create({
        userId: user._id,
        username: user.username,
        category: user.category,
        message: `${user.username} unlocked Stage ${stage._id}!`
    });

    res.send({ success: true, message: 'Stage unlocked', user });
})