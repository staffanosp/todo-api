import { useState, useEffect } from "react";
import { userLogin, verifyToken } from "./api/usersApi";
import "./App.css";
import Login from "./components/Login";
import Todos from "./components/Todos";

function App() {
  const [statusMsg, setStatusMsg] = useState(""); // undefined | pending | true | false
  const [isLoggedIn, setIsLoggedIn] = useState(undefined); // undefined | pending | true | false

  const [isTodosValidating, setIsTodosValidating] = useState(false);
  const [isTokenValidating, setIsTokenValidating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mutationCounter, setMutationCounter] = useState(0);

  useEffect(() => {
    //check login status on mount

    const checkLoggedInStatus = async () => {
      setIsLoggedIn("pending");

      if (!localStorage.getItem("token")) {
        setIsLoggedIn(false);
        return;
      }

      //verify the token
      setIsTokenValidating(true);
      try {
        await verifyToken();
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

  async function handleLogIn(username, password) {
    setMutationCounter((old) => ++old);
    const data = await userLogin(username, password);
    setMutationCounter((old) => --old);

    const { token } = data;

    if (!token) {
      setStatusMsg("couldn't login");
      return;
    }

    localStorage.setItem("token", token);
    setStatusMsg("");
    setIsLoggedIn(true);
  }

  function handleLogOut() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  let content;

  switch (isLoggedIn) {
    case false:
      content = (
        <>
          <Login isDisabled={isSyncing} handleLogin={handleLogIn} />
          <p>{statusMsg}</p>
        </>
      );
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
