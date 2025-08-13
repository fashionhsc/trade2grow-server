const leaderBoardModal = require("../../models/leaderboard");
const tryCatch = require("../../utils/tryCatch");


exports.getAllLeaderboard = tryCatch(async (req, res, next) => {
    const all = await leaderBoardModal.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userId"
            }
        },
        { $unwind: "$userId" },
        {
            $lookup: {
                from: "stages",
                localField: "userId.currentStage",
                foreignField: "_id",
                as: "userId.currentStage"
            }
        },
        { $unwind: { path: "$userId.currentStage", preserveNullAndEmptyArrays: true } },

        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        { $unwind: "$category" },
        { $sort: { "userId.coins": -1 } }
    ]);

    return res.status(200).json({ success: true, data: all });
});
