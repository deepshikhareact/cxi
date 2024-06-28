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

const app = express();
const port = 5055;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const cloudUrl =
  "mongodb+srv://deepshikhareact:user123@cluster0.ynyzkrk.mongodb.net/xperiento?retryWrites=true&w=majority&appName=Cluster0";
const localUrl = "mongodb://localhost:27017/xperiento";

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
app.use("/users", userRoutes);
app.use("/insights", extractToken, insightRoutes);
app.use("/auth", authRoute);

app.get("/test", async (req, res) => {
  try {
    let user = await Insight.find();

    res.json({ message: "Test Api", data: user });
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
