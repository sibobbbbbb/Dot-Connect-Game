const Leaderboard = require('../models/leaderboard');

// Get top 5 scores
exports.getLeaderboard = async (req, res) => {
  const { level, mode } = req.query;
  try {
    const leaderboard = await Leaderboard.find({ level, mode })
      .sort({ score: 1 })
      .limit(5);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add new score
exports.addScore = async (req, res) => {
  const { username, score, level, mode } = req.body;
  try {
    const newScore = new Leaderboard({ username, score, level, mode });
    await newScore.save();
    res.status(201).json({ message: 'Score added to leaderboard' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
