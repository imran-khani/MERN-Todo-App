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
  title: string;
  isCompleted: boolean;
};

const AllTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const { userId, getToken } = useAuth();
  const { user } = useUser();

  const createUser = async () => {
    try {
      const token = await getToken();
      await axios.post(
        "http://localhost:5000/users",
        { clerkId: userId, name: user?.fullName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "http://localhost:5000/todos",
        { userId, title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(
        `http://localhost:5000/todos/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      createUser();
      fetchTodos();
    }
  }, [userId]);

  return (
    <>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-Primary text-2xl md:text-heading py-5">
            All Tasks
          </h1>
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
    </>
  );
};

export default AllTodos;
