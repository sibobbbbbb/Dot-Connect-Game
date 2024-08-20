const mongoose = require('mongoose');

// Leaderboard Schema
const LeaderboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'easy', 'medium', 'hard'],
    required: true,
  },
  mode: {
    type: String,
    enum: ['manual', 'bot'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
