const leaderBoardModal = require("../../models/leaderboard");
const tryCatch = require("../../utils/tryCatch");


exports.getAllLeaderboard = tryCatch(async (req, res, next) => {
    const all = await leaderBoardModal.find({}).populate('userId').populate('category');
    return res.status(200).json({ success: true, data: all });

})