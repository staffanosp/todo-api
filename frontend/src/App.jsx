import { useState } from "react";
import useSWR from "swr";

import "./App.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/todos/",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  console.log(data);
  return (
    <div className="App">
      {data.map(({ title, completed }) => (
        <p style={completed ? { textDecoration: "line-through" } : {}}>
          {title}
        </p>
      ))}
    </div>
  );
}

export default App;
