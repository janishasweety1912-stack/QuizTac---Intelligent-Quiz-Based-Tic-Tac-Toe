import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Example schema
const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  category: String,
  difficulty: String,
  points: Number
});
const Question = mongoose.model("Question", QuestionSchema);

// Routes
app.get("/questions/:difficulty", async (req, res) => {
  const { difficulty } = req.params;
  const questions = await Question.find({ difficulty });
  res.json(questions);
});

app.post("/questions", async (req, res) => {
  const newQ = new Question(req.body);
  await newQ.save();
  res.json(newQ);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
