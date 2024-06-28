

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

// Middleware


app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const cloudUrl =
  "mongodb+srv://deepshikhareact:user123@cluster0.ynyzkrk.mongodb.net/xperimento?retryWrites=true&w=majority&appName=Cluster0";
const localUrl = "mongodb://localhost:27017/xperimento";

const url = localUrl;

mongoose.connect(cloudUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  number: String,
  password: String,
  industrySegment: String,
  userCategory: String,
  firstName: String,
  lastName: String,
  organization: String,
});

const User = mongoose.model("User", userSchema);


// let salesInsights = [
//   {
//     id: 1,
//     industrySegment: "Hospitality",
//     insightCategory: "Sales",
//     insightSubCategory: "Competitive Landscape",
//     iconURL: "",
//     insightDataURL: "",
//     insightLevel: "Level 1",
//     insightTitle: "Price Comparison",
//     insightDescription: `Breakfast
//       Dosa > lowest: Rs. 40. Highest Rs. 150
//       Idly-vada > lowest: Rs. 50. Highest Rs. 120
//     Lunch
//       Thali > lowest: Rs. 80. Highest Rs. 250
//     Thali > lowest: Rs. 80. Highest Rs. 250
//     Dinner
//       Thali > lowest: Rs. 80. Highest Rs. 250`,
//     insightActionItem: "",
//     actionItemExample: "",
//     createdBy: "UID28830013920",
//     month: "May",
//     date: 15,
//     year: 2024,
//     time: "18:25",
//     feedbackLikes: 0,
//     feedbackDislikes: 0,
//     numberOfSaves: 0,
//     implementedNumber: 0,
//     commentsFromCustomer: ""
//   }
// ];

// app.get('/api/sales-insights', (req, res) => {
//   res.json(salesInsights);
// });

// app.post('/api/sales-insights', (req, res) => {
//   const newInsight = { id: salesInsights.length + 1, ...req.body };
//   salesInsights.push(newInsight);
//   res.status(201).json(newInsight);
// });

// app.put('/api/sales-insights/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const index = salesInsights.findIndex(insight => insight.id === id);
//   if (index !== -1) {
//     salesInsights[index] = { ...salesInsights[index], ...req.body };
//     res.json(salesInsights[index]);
//   } else {
//     res.status(404).json({ message: "Insight not found" });
//   }
// });

// app.delete('/api/sales-insights/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   salesInsights = salesInsights.filter(insight => insight.id !== id);
//   res.status(204).end();
// });

// Routes


// const salesInsights = [
//   {
//     industrySegment: "Hospitality",
//     insightCategory: "Sales",
//     insightSubCategory: "Competitive Landscape",
//     iconURL: "https://example.com/icon.png",
//     insightDataURL: "https://example.com/data",
//     insightLevel: "Level 1",
//     insightTitle: "Price Comparison",
//     insightDescription: `Breakfast
//     Dosa > lowest: Rs. 40. Highest Rs. 150
//     Idly-vada > lowest: Rs. 50. Highest Rs. 120
//     Lunch
//     Thali > lowest: Rs. 80. Highest Rs. 250
//     Thali > lowest: Rs. 80. Highest Rs. 250
//     Dinner
//     Thali > lowest: Rs. 80. Highest Rs. 250`,
//     insightActionItem: "Compare pricing strategies.",
//     actionItemExample: "Check competitor prices monthly.",
//     createdBy: "UID28830013920",
//     month: "May",
//     date: 15,
//     year: 2024,
//     time: "18:25",
//     feedbackLikes: 10,
//     feedbackDislikes: 2,
//     numberOfSaves: 5,
//     implementedNumber: 3,
//     commentsFromCustomer: "Helpful for setting competitive prices."
//   }
// ];
const salesInsights = [
  {
    industrySegment: "Hospitality",
    insightCategory: "Sales",
    insightSubCategory: "Competitive Landscape",
    iconURL: "https://example.com/icon.png",
    insightDataURL: "https://example.com/data",
    insightLevel: "Level 1",
    insightTitle: "Price Comparison",
    insightDescription: `Breakfast
    Dosa > lowest: Rs. 40. Highest Rs. 150
    Idly-vada > lowest: Rs. 50. Highest Rs. 120
    Lunch
    Thali > lowest: Rs. 80. Highest Rs. 250
    Thali > lowest: Rs. 80. Highest Rs. 250
    Dinner
    Thali > lowest: Rs. 80. Highest Rs. 250`,
    insightActionItem: "Compare pricing strategies.",
    actionItemExample: "Check competitor prices monthly.",
    createdBy: "UID28830013920",
    month: "May",
    date: 15,
    year: 2024,
    time: "18:25",
    feedbackLikes: 10,
    feedbackDislikes: 2,
    numberOfSaves: 5,
    implementedNumber: 3,
    commentsFromCustomer: "Helpful for setting competitive prices."
  }
];


app.get('/api/sales-insights', (req, res) => {
  res.json(salesInsights);
});
app.post('/api/sales-insights', (req, res) => {
  const newInsight = { id: salesInsights.length + 1, ...req.body };
  salesInsights.push(newInsight);
  res.status(201).json(newInsight);
});

app.put('/api/sales-insights/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = salesInsights.findIndex(insight => insight.id === id);
  if (index !== -1) {
    salesInsights[index] = { ...salesInsights[index], ...req.body };
    res.json(salesInsights[index]);
  } else {
    res.status(404).json({ message: "Insight not found" });
  }
});

app.delete('/api/sales-insights/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  salesInsights = salesInsights.filter(insight => insight.id !== id);
  res.status(204).end();
});



app.post("/api/create-account", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

app.post("/api/sign-in", async (req, res) => {
  try {
    const { number, password } = req.body;
    const user = await User.findOne({ number, password });
    if (user) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});


const InsightSchema = new mongoose.Schema({
  insightTitle: String,
  insightDescription: String,
  insightActionItem: String,
  actionItemExample: String,
  feedbackLikes: Number,
  feedbackDislikes: Number,
});

const Insight = mongoose.model('Insight', InsightSchema);

app.get('/api/sales-insights', async (req, res) => {
  const insights = await Insight.find();
  res.json(insights);
});

app.put('/api/sales-insights/:id/feedback', async (req, res) => {
  const { id } = req.params;
  const { feedbackLikes, feedbackDislikes } = req.body;

  const insight = await Insight.findById(id);
  if (insight) {
    insight.feedbackLikes = feedbackLikes !== undefined ? feedbackLikes : insight.feedbackLikes;
    insight.feedbackDislikes = feedbackDislikes !== undefined ? feedbackDislikes : insight.feedbackDislikes;
    await insight.save();
    res.json(insight);
  } else {
    res.status(404).send('Insight not found');
  }
});

// const InsightSchema = new mongoose.Schema({
//   insightTitle: String,
//   insightDescription: String,
//   insightActionItem: String,
//   actionItemExample: String,
//   feedbackLikes: Number,
//   feedbackDislikes: Number,
// });

// const Insight = mongoose.model('Insight', InsightSchema);

// // Route to get all insights
// app.get('/api/sales-insights', async (req, res) => {
//   const insights = await Insight.find();
//   res.json(insights);
// });

// Route to update likes or dislikes
app.put('/api/sales-insights/:id/feedback', async (req, res) => {
  const { id } = req.params;
  const { feedbackLikes, feedbackDislikes } = req.body;

  const insight = await Insight.findById(id);
  if (insight) {
    insight.feedbackLikes = feedbackLikes !== undefined ? feedbackLikes : insight.feedbackLikes;
    insight.feedbackDislikes = feedbackDislikes !== undefined ? feedbackDislikes : insight.feedbackDislikes;
    await insight.save();
    res.json(insight);
  } else {
    res.status(404).send('Insight not found');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your_database_name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   email: String,
//   number: String,
//   password: String,
//   industrySegment: String,
//   userCategory: String,
//   firstName: String,
//   lastName: String,
//   organization: String,
// });

// const User = mongoose.model('User', userSchema);

// // Routes
// app.post('/api/create-account', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).send({ success: true });
//   } catch (error) {
//     res.status(500).send({ success: false, error });
//   }
// });

// app.post('/api/sign-in', async (req, res) => {
//   try {
//     const { number, password } = req.body;
//     const user = await User.findOne({ number, password });
//     if (user) {
//       res.send({ success: true });
//     } else {
//       res.send({ success: false });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, error });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
