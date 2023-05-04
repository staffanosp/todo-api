import { useState, useEffect } from "react";
import { userLogin, verifyToken } from "./api/usersApi";
import "./App.css";
import Login from "./components/Login";
import Todos from "./components/Todos";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined); // undefined | pending | true | false

  const [isTodosValidating, setIsTodosValidating] = useState(false);
  const [isTokenValidating, setIsTokenValidating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mutationCounter, setMutationCounter] = useState(0);

  useEffect(() => {
    //check login status on mount

    const checkLoggedInStatus = async () => {
      setIsLoggedIn("pending");
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      //verify the token
      setIsTokenValidating(true);
      try {
        await verifyToken(token);
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.clear();
        setIsLoggedIn(false);
      }

      setIsTokenValidating(false);
    };

    if (isLoggedIn === undefined) {
      checkLoggedInStatus();
    }
  }, []);

  useEffect(() => {
    if (mutationCounter || isTodosValidating || isTokenValidating) {
      setIsSyncing(true);
    } else {
      setIsSyncing(false);
    }
  }, [mutationCounter, isTodosValidating, isTokenValidating]);

  async function handleLogIn() {
    setMutationCounter((old) => ++old);

    const { token } = await userLogin();

    localStorage.setItem("token", token);

    setMutationCounter((old) => --old);
    setIsLoggedIn(true);
  }

  function handleLogOut() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  let content;

  switch (isLoggedIn) {
    case false:
      content = <Login isDisabled={isSyncing} handleLogin={handleLogIn} />;
      break;
    case true:
      content = (
        <Todos
          handleLogOut={handleLogOut}
          setMutationCounter={setMutationCounter}
          setIsTodosValidating={setIsTodosValidating}
        />
      );
      break;
  }

  return (
    <div className="App">
      {content}
      {isSyncing && (
        <div className="sync-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default App;
