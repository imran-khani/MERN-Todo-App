import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [value, setValue] = useState<string>("");

  const onClick = () => {
    if (value.trim() !== "") {
      addTodo(value);
      setValue("");
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Add a new todo"
          className="w-full border border-gray-300 rounded-md px-4 py-2 ring-0 focus:ring-2 focus:outline-none focus:ring-Primary"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={onClick} className="bg-primary px-4 py-2 rounded-md absolute right-0">
          <PlusCircle size={24} className="text-Primary" />
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
