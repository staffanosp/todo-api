import { useState, useEffect, useRef } from "react";
import useSWR from "swr";

import {
  TODOS_ENDPOINT as cacheKey,
  getTodos,
  addTodo,
  deleteTodos,
  updateTodo,
  deleteTodo,
} from "./api/todosApi";

import {
  addTodoOptions,
  updateTodoOptions,
  deleteTodoOptions,
  deleteTodosOptions,
} from "./api/todosSWROptions";

import "./App.css";
import TodoItem from "./components/TodoItem";
import Button from "./components/Button";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const [todosSelection, setTodosSelection] = useState({});
  const [isMultiSelection, setIsMultiSelection] = useState(false);
  const todosIndexToId = useRef();

  const todosListElRef = useRef();

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
    document.addEventListener("click", handleDocumentClick);

    return () => {
      removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (todos) {
      todosLength.current.prev = todosLength.current.new;
      todosLength.current.new = todos.filter((todo) => !todo.isPending).length;
    }

    //is it better to handle this closer to list view?
    todosIndexToId.current = Object.fromEntries(
      todos?.map((todo, i) => [i, todo.id]) ?? []
    );

    setTodosSelection({});
  }, [todos]);

  useEffect(() => {
    if (isValidating || mutationCounter > 0) {
      setIsSyncing(true);
    } else {
      setIsSyncing(false);
    }
  }, [isValidating, mutationCounter]);

  useEffect(() => {
    setIsMultiSelection(todosSelection.selected?.length > 1);
  }, [todosSelection]);

  const handleDocumentClick = (e) => {
    //catch clicks outside list, to unselect
    if (
      e.target.contains(todosListElRef.current) &&
      e.target !== todosListElRef.current
    ) {
      setTodosSelection({});
    }
  };

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

  const deleteTodosMutation = async (ids) => {
    setMutationCounter((old) => ++old);

    try {
      await mutate(deleteTodos(ids), deleteTodosOptions(ids));
    } catch (e) {
      console.error("Mutation error");
    }

    setMutationCounter((old) => --old);
  };

  const handleTodoListClick = (clickedIndex, modKeys) => {
    const toggle = (arr, item) => {
      if (arr.includes(item)) {
        return arr.filter((oldItem) => oldItem !== item);
      } else {
        return [...arr, item];
      }
    };

    const arrayRange = (start, stop, step) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
      );

    const prev = todosSelection.current;

    let current, selected, shiftAnchor;

    current = clickedIndex;
    selected = todosSelection.selected || [];

    if (modKeys.cmd) {
      selected = toggle(selected, current);
    } else if (modKeys.shift) {
      if (todosSelection.shiftAnchor === undefined) {
        //first "shift click"
        shiftAnchor = prev;
      } else {
        //repeated shift click
        shiftAnchor = todosSelection.shiftAnchor;

        //remove previous shift click selection
        const toBeRemoved = arrayRange(
          shiftAnchor,
          prev,
          Math.sign(prev - shiftAnchor)
        );

        selected = selected.filter((item) => !toBeRemoved.includes(item));
      }

      const shiftSelection = arrayRange(
        shiftAnchor,
        current,
        Math.sign(current - shiftAnchor)
      );

      selected = [...selected, ...shiftSelection];
    } else {
      selected = [current];
    }

    selected = [...new Set(selected)].sort((a, b) => a - b);
    const newTodosSelection = { current, selected, shiftAnchor };
    setTodosSelection(newTodosSelection);
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

      <div className="todos-wrapper" ref={todosListElRef}>
        {todos.map((todo, i) => (
          <TodoItem
            listIndex={i}
            key={todo.id || i}
            todo={todo}
            isSelected={todosSelection.selected?.includes(i)}
            animDelayMultiplier={i - todosLength.current.prev}
            updateTodo={updateTodoMutation}
            deleteTodo={deleteTodoMutation}
            onClick={handleTodoListClick}
          />
        ))}
      </div>
      {isMultiSelection && (
        <div>
          <Button
            onClick={() => {
              deleteTodosMutation(
                todosSelection.selected.map(
                  (idx) => todosIndexToId.current[idx]
                )
              );
            }}
          >
            Delete selected
          </Button>
        </div>
      )}
      {isSyncing && (
        <div className="sync-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default App;
