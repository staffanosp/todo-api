import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Todos from "./components/Todos";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogIn() {
    setIsLoggedIn(true);
  }

  function handleLogOut() {
    setIsLoggedIn(false);
  }

  return (
    <div class="App">
      {!isLoggedIn ? (
        <Login handleLogin={handleLogIn} />
      ) : (
        <Todos handleLogOut={handleLogOut} />
      )}
    </div>
  );
}

export default App;
