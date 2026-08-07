const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const questionRoutes = require("./routes/questionRoutes");
const gameRoutes = require("./routes/gameRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/games", gameRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("QuizTac Backend Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});