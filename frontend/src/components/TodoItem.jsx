import { useState } from "react";

function TodoItem({
  label,
  id,
  isCompleted,
  isPending,
  updateTodo,
  deleteTodo,
}) {
  const [checkbox, setCheckbox] = useState(isCompleted);

  const style = {};
  if (isCompleted) style.textDecoration = "line-through"; //SHOULD BE isCompleted?!
  if (isPending) style.opacity = "0.4";

  return (
    <div>
      {!isPending && (
        <input
          type="checkbox"
          checked={checkbox}
          onChange={(e) => {
            const checked = e.target.checked;
            console.log("CHANGE CHECKBOX?!");
            setCheckbox(checked);

            updateTodo(id, { isCompleted: checked });
          }}
        />
      )}

      <span style={style}>{label}</span>
      {!isPending && (
        <button type="button" onClick={() => deleteTodo(id)}>
          DELETE
        </button>
      )}
    </div>
  );
}

export default TodoItem;
