"use client";

import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
}

export default function TaskList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/todos", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTodos(data.todos);
      setError("");
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();

    // Listen for custom events from other components
    const handleTaskChange = () => fetchTodos();
    window.addEventListener("task-added", handleTaskChange);
    window.addEventListener("task-updated", handleTaskChange);

    return () => {
      window.removeEventListener("task-added", handleTaskChange);
      window.removeEventListener("task-updated", handleTaskChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-100 h-24 rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
