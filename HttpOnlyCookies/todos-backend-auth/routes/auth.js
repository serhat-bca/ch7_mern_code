const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = require("express").Router();
const User = require("../models/user");
require("dotenv").config();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  const passCheck = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!passCheck) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 1000,
    sameSite: "strict",
  });

  res
    .status(200)
    .json({ username: user.username, name: user.name, id: user._id });
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.json({ message: "Logged out" });
});

module.exports = authRouter;
