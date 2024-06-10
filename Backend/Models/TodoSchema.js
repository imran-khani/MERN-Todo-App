import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Ensures that the title field is mandatory
      trim: true, // Removes whitespace from both ends of the string
    },
    isCompleted: {
      type: Boolean,
      default: false, // Default value is false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Todo = mongoose.model("Todo", TodoSchema);
