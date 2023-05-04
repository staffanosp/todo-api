function Button({ children, onClick, disabled }) {
  return (
    <button
      className="button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
