const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.action");
const insightRoutes = require("./routes/insight.action");
const authRoute = require("./routes/auth.action");
const extractToken = require("./utils/middleware");
const Insight = require("./models/Insights_model");
const User = require("./models/User_Customer");
require("dotenv").config();

const app = express();
const port = 5055;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const cloudUrl = process.env.CLOUD_URL;
const localUrl = process.env.LOCAL_URL;

const dbUrl = cloudUrl;

mongoose.connect(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error.message);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// API Routes
app.use("/users", extractToken, userRoutes);
app.use("/insights", extractToken, insightRoutes);
app.use("/auth", authRoute);

app.get("/test", async (req, res) => {
  try {
    // let user = await Insight.find();

    res.json({ message: "Test Api", data: "Testing Api" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello, this is your Xperiento server!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
