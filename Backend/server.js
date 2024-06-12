import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

// models
import { Todo } from "./Models/TodoSchema.js";
import { User } from "./Models/UserSchema.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
configDotenv();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Mongo Connected");
});

app.post("/users", async (req, res) => {
  const { clerkId, name } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ clerkId });
    if (!user) {
      user = new User({ clerkId, name });
      await user.save();
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.get("/todos/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

app.post("/todos", async (req, res) => {
  const { userId, title } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newTodo = new Todo({
      title,
      userId: user._id, // store user ID from the database
    });

    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error adding todo" });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

//   delete all todos 
app.delete("/todos", async (req, res) => {
  try {
    await Todo.deleteMany();
    res.json({ message: "All Todos Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todos" });
  }
});

app.listen(port, () => {
  console.log(`Port is Listening at ${port}`);
});
