import { useState } from "react";
import Button from "./Button";

function Login({ handleLogin, isDisabled }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(usernameInput, passwordInput);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          disabled={isDisabled}
        />
        <input
          type="password"
          placeholder="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          disabled={isDisabled}
        />
        <input type="submit" value="log in" />
      </form>
      {/* <Button onClick={() => handleLogin("test", "asdf")} disabled={isDisabled}>
        Log In
      </Button> */}
    </div>
  );
}

export default Login;
