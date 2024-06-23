import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

todoSchema.index({ userId: 1 });

export const TodoModel = mongoose.model("Todo", todoSchema);

export const createNewTodo = (values) =>
  new TodoModel(values).save().then((todo) => todo.toObject());

export const getTodos = (userId) =>
  TodoModel.find({ userId }, "text isCompleted").lean();

export const getActiveTodos = (userId) =>
  TodoModel.find({ userId, isCompleted: false }).lean();

export const getCompletedTodos = (userId) =>
  TodoModel.find({ userId, isCompleted: true }).lean();

export const getTodoById = (id) => TodoModel.findById(id);

export const countActiveTodos = (userId) =>
  TodoModel.countDocuments({ userId, isCompleted: false }).lean();

export const updateTodoById = (id, values) =>
  TodoModel.findByIdAndUpdate(id, values);

export const deleteTodoById = (id) => TodoModel.findOneAndDelete({ _id: id });

export const deleteCompletedTodos = (userId) =>
  TodoModel.deleteMany({ userId, isCompleted: true });
