const express = require('express');
const { getAllLeaderboard } = require('../../controllers/user/leaderboard');
const leaderboardRoutes = express.Router();


leaderboardRoutes.get('/all', getAllLeaderboard);


module.exports = leaderboardRoutes;