import { useState, useEffect } from "react";
import useSWR from "swr";
import "./App.css";
import TodoItem from "./components/TodoItem";

const ENDPOINT_BASE = "http://localhost:3000/api/todos";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const addTodo = async (newTodo) => {
  const res = await fetch(`${ENDPOINT_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  const data = await res.json();
  return data;
};

const updateTodo = async (id, body) => {
  console.log("UPDATE TODO?!");
  const res = await fetch(`${ENDPOINT_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
};

const deleteTodo = async (id) => {
  console.log("DELETE TODO?!");
  const res = await fetch(`${ENDPOINT_BASE}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const [mutationCounter, setMutationCounter] = useState(0);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${ENDPOINT_BASE}`,
    fetcher
  );

  useEffect(() => {
    if (isValidating || mutationCounter > 0) {
      setIsSyncing(true);
    } else {
      setIsSyncing(false);
    }
  }, [isValidating, mutationCounter]);

  async function handleSubmit(e) {
    e.preventDefault();

    setMutationCounter((old) => ++old);

    setTodoInput("");

    const newTodo = {
      title: todoInput,
    };

    try {
      await mutate(addTodo(newTodo), {
        optimisticData: [...data, { ...newTodo, isPending: true }],
        rollbackOnError: false,
        populateCache: false,
        revalidate: true,
      });
      console.log("MUTATE: SUCCESS");
    } catch (e) {
      console.error("MUTATE: ERROR");
    }

    setMutationCounter((old) => --old);
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

      {data.map(({ title, id, isCompleted, isPending }, i) => (
        <TodoItem
          key={id || i}
          id={id}
          label={title}
          isCompleted={isCompleted}
          isPending={isPending}
          updateTodo={async (id, body) => {
            setMutationCounter((old) => ++old);
            try {
              await mutate(updateTodo(id, body), {
                optimisticData: (data) => {
                  const index = data.findIndex((item) => item.id === id);
                  data[index] = { ...data[index], ...body };
                  return [...data];
                },
                rollbackOnError: true,
                populateCache: (updatedTodo, data) => {
                  const index = data.findIndex((item) => item.id === id);

                  data[index] = updatedTodo;
                  return [...data];
                },
                revalidate: false,
              });
              console.log("MUTATE: SUCCESS");
            } catch (e) {
              console.error("MUTATE: ERROR");
            }
            setMutationCounter((old) => --old);
          }}
          deleteTodo={async (id) => {
            setMutationCounter((old) => ++old);
            try {
              await mutate(deleteTodo(id), {
                optimisticData: (data) => {
                  const index = data.findIndex((item) => item.id === id);
                  data.splice(index, 1);
                  return [...data];
                },
                rollbackOnError: true,
                populateCache: false, //TODO: populate cache!
                revalidate: false,
              });
              console.log("MUTATE: SUCCESS");
            } catch (e) {
              console.error("MUTATE: ERROR");
            }
            setMutationCounter((old) => --old);
          }}
        />
      ))}
    </div>
  );
}

export default App;
