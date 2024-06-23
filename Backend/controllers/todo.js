import {
  TodoModel,
  countActiveTodos,
  createNewTodo,
  deleteCompletedTodos,
  deleteTodoById,
  getActiveTodos,
  getCompletedTodos,
  getTodoById,
  getTodos,
  updateTodoById,
} from "../src/Models/TodoSchema.js";

import { clerkClient } from "../src/lib/clerkClient.js";

const unauthenticated = (res) => {
  res.status(401).json({
    message: "session expired or not authenticated",
  });
};

// get the user from the session
const getUser = async (userId) => {
  return await clerkClient.users.getUser(userId);
};

const createTodo = async (req, res) => {
  try {
    const user = await getUser(req.auth.userId);
    if (!req.auth.sessionId) return unauthenticated(res);
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const newTodo = await createNewTodo({
      text,
      isCompleted: false,
      userId: user.id,
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllActiveTodos = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(req);

    const user = await getUser(req.auth.userId);
    if (!user || typeof user.id !== "string" || user.id !== req.auth.userId) {
      return res.status(403).json({ message: "invalid user or userid" });
    }
    const todosCount = await getActiveTodos(user.id);

    return res.status(200).json(todosCount);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getActiveCount = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(req);

    const user = await getUser(req.auth.userId);
    // extra by me
    if (!user || typeof user.id !== "string" || user.id !== req.auth.userId) {
      return res.status(403).json({ message: "invalid user or userId" });
    }
    const todosCount = await getActiveTodos(user.id);
    return res.status(200).json(todosCount);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getAllCompletedTodos = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);
    const user = await getUser(req.auth.userId);
    if (!user || typeof user.id !== "string" || user.id !== req.auth.userId) {
      return res.status(403).json({ message: "invalid user or userId" });
    }

    const allCompletedTodos = await getCompletedTodos(user.id);

    return res.status(200).json(allCompletedTodos);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);
    const { id } = req.query;
    if (!id) {
      return res.sendStatus(400).json({ error: "id not found" });
    }

    const deleteIt = await deleteTodoById(id);

    return res.status(200).json(deleteIt);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateTodoStatus = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const { id } = req.query;

    if (!id) {
      return res.sendStatus(400).json({ error: "Id not found" });
    }

    const todo = await getTodoById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    return res.status(200).json(todo).end();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const updateTodo = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const { id } = req.query;
    const { text } = req.body;

    if (!id) {
      return res.sendStatus(400).json({ error: "Id not found" });
    }

    const todo = await getTodoById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    let updatedTodo;

    if (text) {
      updatedTodo = await updateTodoById(id, { text });
    } else {
      todo.isCompleted = !todo.isCompleted;
      updatedTodo = todo.save();
    }

    return res.status(200).json(updatedTodo).end();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const deleteAllCompletedTodos = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const user = await getUser(req.auth.userId);

    const deletedTodos = await deleteCompletedTodos(user.id);

    return res.json(deletedTodos);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getTodos,
  getAllActiveTodos,
  getAllCompletedTodos,
  createTodo,
  deleteTodo,
  updateTodoStatus,
  updateTodo,
  deleteAllCompletedTodos,
  getActiveCount,
};
