const User = require("../models/User");

// save score
exports.saveScore = async (req, res) => {
  const { username, time, level, mode } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cari skor terbaik saat ini untuk level dan mode yang sama
    const currentBestScore = user.scores.find(score => score.level === level && score.mode === mode);

    if (currentBestScore) {
      if (time < currentBestScore.time) {
        currentBestScore.time = time;
      }
    } else {
      user.scores.push({ time, level, mode });
    }

    await user.save();

    res.status(200).json({ message: "Score saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving score", error });
  }
};

// get leaderboard
exports.getLeaderboard = async (req, res) => {
  const { level, mode } = req.query;

  try {
    const users = await User.find(
      {
        "scores.level": level,
        "scores.mode": mode,
      },
      {
        username: 1,
        scores: {
          $elemMatch: { level, mode },
        },
      }
    )
      .sort({ "scores.time": 1 }) // Urutkan berdasarkan waktu tercepat
      .limit(5); // Batasi hingga 5 skor terbaik

    const leaderboard = users.map((user) => ({
      username: user.username,
      time: user.scores[0].time,
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
};
