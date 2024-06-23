import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";

type Todo = {
  todo: {
    _id: string;
    userId: string;
    text: string;
    isCompleted: boolean;
  };
};

const TodoItem: React.FC<Todo> = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(todo.isCompleted);

  const { getToken } = useAuth();

  const handleCheckboxChange = async () => {
    setIsChecked((prev) => !prev);
    try {
      const token = await getToken();
      await axios.put(
        `http://localhost:5000/todos/${todo._id}`,
        {
            isCompleted: !isChecked,
        },
        {   
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       console.log("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div
      key={todo._id}
      className="bg-white p-4 rounded-md flex gap-x-2 items-center"
    >
      {/* Custom checkbox */}
      <div
        className={`w-6 h-6 border-2 border-Primary border-opacity-40 rounded-md flex items-center justify-center cursor-pointer ${
          isChecked ? "bg-primary" : ""
        }`}
        onClick={handleCheckboxChange}
      >
        {isChecked && <CheckIcon size={20} className="text-Primary" />}
      </div>
      {/* Todo title */}
      <h1
        className={`text-lg font-bold text-heading ${
          isChecked ? "line-through" : ""
        }`}
      >
        {todo.text}
      </h1>
    </div>
  );
};

export default TodoItem;
