import { useState, useEffect, useRef } from "react";
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
  const todosLength = useRef({ prev: 0, new: 0 });

  const [mutationCounter, setMutationCounter] = useState(0);

  const {
    data: todos,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(cacheKey, getTodos);

  useEffect(() => {
    if (todos) {
      todosLength.current.prev = todosLength.current.new;
      todosLength.current.new = todos.filter((todo) => !todo.isPending).length;
    }
  }, [todos]);

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
  if (isLoading) return <div className="loader"></div>;

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="new todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        ></input>
      </form>

      <div className="todos-wrapper">
        {todos.map((todo, i) => (
          <TodoItem
            key={todo.id || i}
            animDelayMultiplier={i - todosLength.current.prev}
            todo={todo}
            updateTodo={updateTodoMutation}
            deleteTodo={deleteTodoMutation}
          />
        ))}
      </div>

      {isSyncing && (
        <div className="sync-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default App;
