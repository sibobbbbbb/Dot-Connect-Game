const express = require('express');
const { saveScore, getLeaderboard } = require('../controllers/scoreController');
const router = express.Router();

// save score
router.post('/save-score', saveScore);

// get leaderboard
router.get('/leaderboard', getLeaderboard);

module.exports = router;
