import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

// models
import { Todo } from "./Models/TodoSchema.js";

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

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
  });
  await newTodo.save();
  res.json(newTodo);
});

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
