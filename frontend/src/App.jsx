import { useState, useEffect } from "react";
import useSWR from "swr";

import {
  TODOS_ENDPOINT as cacheKey,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./api/todosApi";

import {
  addTodoOptions,
  updateTodoOptions,
  deleteTodoOptions,
} from "./api/todosSWROptions";

import "./App.css";
import TodoItem from "./components/TodoItem";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const [mutationCounter, setMutationCounter] = useState(0);

  const {
    data: todos,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(cacheKey, getTodos);

  useEffect(() => {
    if (isValidating || mutationCounter > 0) {
      setIsSyncing(true);
    } else {
      setIsSyncing(false);
    }
  }, [isValidating, mutationCounter]);

  const addTodoMutation = async (newTodo) => {
    setMutationCounter((old) => ++old);

    try {
      await mutate(addTodo(newTodo), addTodoOptions(newTodo, todos));
    } catch (e) {
      console.error("Mutation error");
    }

    setMutationCounter((old) => --old);
  };

  const updateTodoMutation = async (id, body) => {
    setMutationCounter((old) => ++old);

    try {
      await mutate(updateTodo(id, body), updateTodoOptions(id, body));
    } catch (e) {
      console.error("Mutation error");
    }

    setMutationCounter((old) => --old);
  };

  const deleteTodoMutation = async (id) => {
    setMutationCounter((old) => ++old);

    try {
      await mutate(deleteTodo(id), deleteTodoOptions(id));
    } catch (e) {
      console.error("Mutation error");
    }

    setMutationCounter((old) => --old);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setTodoInput("");

    await addTodoMutation({
      title: todoInput,
    });
  }

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        ></input>
        {isSyncing && <span>SYNCING</span>}
      </form>

      <div className="todos-wrapper">
        {todos.map((todo, i) => (
          <TodoItem
            key={todo.id || i}
            todo={todo}
            updateTodo={updateTodoMutation}
            deleteTodo={deleteTodoMutation}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
