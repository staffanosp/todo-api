import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Todos from "./components/Todos";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isTodosValidating, setIsTodosValidating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mutationCounter, setMutationCounter] = useState(0);

  useEffect(() => {
    console.log({ mutationCounter });
    if (mutationCounter > 0 || isTodosValidating) {
      setIsSyncing(true);
    } else {
      setIsSyncing(false);
    }
  }, [mutationCounter, isTodosValidating]);

  function handleLogIn() {
    setIsLoggedIn(true);
  }

  function handleLogOut() {
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login handleLogin={handleLogIn} />
      ) : (
        <Todos
          handleLogOut={handleLogOut}
          setMutationCounter={setMutationCounter}
          setIsTodosValidating={setIsTodosValidating}
        />
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
