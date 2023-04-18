import { useState } from "react";

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const { title, id, isCompleted, isPending } = todo;

  const [checkbox, setCheckbox] = useState(isCompleted);

  const style = {};
  if (isCompleted) style.textDecoration = "line-through";
  if (isPending) style.opacity = "0.4";

  return (
    <div>
      {!isPending && (
        <input
          type="checkbox"
          checked={checkbox}
          onChange={(e) => {
            const checked = e.target.checked;
            setCheckbox(checked);

            updateTodo(id, { isCompleted: checked });
          }}
        />
      )}

      <span style={style}>{title}</span>
      {!isPending && (
        <button type="button" onClick={() => deleteTodo(id)}>
          DELETE
        </button>
      )}
    </div>
  );
}

export default TodoItem;
