import { useState, useEffect } from "react";

import "../styles/TodoItem.css";

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const { title, id, isCompleted, isPending } = todo;

  const [checkbox, setCheckbox] = useState(isCompleted);
  const [initAnim, setInitAnim] = useState(true);

  useEffect(() => {
    setInitAnim(false);
  }, []);

  const wrapperClassName = ["TodoItem__wrapper"];
  if (isPending || initAnim) wrapperClassName.push("pending");
  if (isCompleted) wrapperClassName.push("completed");

  return (
    <div className={wrapperClassName.join(" ")}>
      <div className="checkbox__wrapper">
        <input
          disabled={isPending}
          type="checkbox"
          checked={checkbox}
          onChange={(e) => {
            const checked = e.target.checked;
            setCheckbox(checked);

            updateTodo(id, { isCompleted: checked });
          }}
        />
      </div>
      <div className="title__wrapper">
        <span>{title}</span>
      </div>
      <div className="delete__wrapper">
        {!isPending && (
          <button type="button" onClick={() => deleteTodo(id)}>
            DELETE
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
