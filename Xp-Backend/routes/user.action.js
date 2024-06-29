const express = require("express");
const router = express.Router();
const User = require("../models/User_Customer");
const extractToken = require("../utils/middleware");
const Insight = require("../models/Insights_model");
// Get all users
router.get("/", async (req, res) => {
  try {
    // const users = await User.find().lean().exec();
    res.json({ data: "GET ALL USERS", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});
router.get("/counts", async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const todoLength = user.todo.length;
    const likedLength = user.liked.length;
    res.status(200).json({ message: "Test Api", todoLength, likedLength });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});
router.get("/myTodos", async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate({ path: "todo" }).exec();
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ data: user.todo, success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

router.get("/myImpletements", async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate({ path: "implement" })
      .exec();
    // console.log("User", user);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ data: user.implement, success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

module.exports = router;
