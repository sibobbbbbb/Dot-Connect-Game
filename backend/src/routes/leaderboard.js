const express = require('express');
const { getLeaderboard, addScore } = require('../controllers/leaderboardController');
const router = express.Router();

// Get the leaderboard
router.get('/', getLeaderboard);

// Add a new score
router.post('/', addScore);

module.exports = router;
