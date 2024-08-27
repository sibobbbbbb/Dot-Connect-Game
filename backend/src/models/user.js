const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  time: {
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
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  scores: [scoreSchema], 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
