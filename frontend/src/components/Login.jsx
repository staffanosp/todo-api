import Button from "./Button";

function Login({ handleLogin, isDisabled }) {
  return (
    <Button onClick={handleLogin} disabled={isDisabled}>
      Log In
    </Button>
  );
}

export default Login;
