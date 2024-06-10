import { useState } from "react";

interface TodoInputProps {
  addTodo: (string: string) => void;
}

const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="Add Todo"
          className="w-full p-3 rounded-md border border-indigo-500 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
        />
        <button
          onClick={() => {
            addTodo(value);
            setValue("");
          }}
          className="absolute right-0 top-0 bottom-0 px-4 text-white bg-indigo-500"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
