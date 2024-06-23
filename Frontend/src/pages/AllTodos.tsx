import { useEffect, useState } from "react";
import axios from "axios";
import EmptyState from "../components/EmptyState";
import { useAuth, useUser } from "@clerk/clerk-react";
import TodoForm from "../components/Todo/TodoForm";
import { Button } from "../components/Button";
import { PlusCircle } from "lucide-react";
import TodoItem from "../components/Todo/TodoItem";

export type Todo = {
  _id: string;
  userId: string;
  text: string;
  isCompleted: boolean;
};

const AllTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get("http://localhost:5000/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.post(
        "http://localhost:5000/todos",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-Primary text-2xl md:text-heading py-5">All Tasks</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="md:mr-20">
            <PlusCircle size={24} className="text-white" />
          </Button>
        )}
      </div>
      <div className="flex justify-between items-center">
        {showForm && <TodoForm addTodo={addTodo} />}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : todos.length === 0 ? (
        <EmptyState noData={true} setShowForm={setShowForm} />
      ) : (
        <div className="flex flex-col">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTodos;
