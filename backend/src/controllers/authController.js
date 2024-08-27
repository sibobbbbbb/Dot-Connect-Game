const User = require("../models/User");

// Register User
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }else if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.json({ message: "Login successful", userId: user.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
