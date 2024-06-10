import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

// models
import { Todo } from "./Models/TodoSchema.js";
import { User } from "./Models/UserSchema.js"; // Import the User model

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
configDotenv();

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Mongo Connected");
});

app.get("/todos/userId", async (req, res) => {
  const todos = await Todo.find({
    userId: req.params.userId,
  });
  res.json(todos);
});

// Create a new todo for a specific user
app.post("/todos", async (req, res) => {
  const { userId, title } = req.body;

  // Find the user by userId
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newTodo = new Todo({
    title,
    userId,
  });

  await newTodo.save();
  res.json(newTodo);
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { isCompleted: req.body.isCompleted },
    { new: true }
  );
  res.json(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo Deleted" });
});

app.listen(port, () => {
  console.log(`Port is Listening at ${port}`);
});
