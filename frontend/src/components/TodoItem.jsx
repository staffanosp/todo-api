import { useState, useEffect } from "react";

import "../styles/TodoItem.css";
import Button from "./Button";

function TodoItem({
  listIndex,
  todo,
  isSelected,
  animDelayMultiplier,
  updateTodo,
  deleteTodo,
  onClick,
}) {
  const { title, id, isCompleted, isPending } = todo;

  const [checkbox, setCheckbox] = useState(isCompleted);
  const [pendingAnim, setPendingAnim] = useState(true);

  useEffect(() => {
    setTimeout(() => setPendingAnim(false), animDelayMultiplier * 50);
  }, []);

  const handleClick = (e) => {
    //TODO: SHOULD TAKE WINDOWS CTRL INTO CONSIDERATION!
    const modKeys = {
      cmd: e.metaKey,
      shift: e.shiftKey,
    };

    onClick(listIndex, modKeys);
  };

  const wrapperClassName = ["TodoItem__wrapper"];
  if (isPending || pendingAnim) wrapperClassName.push("pending");
  if (isCompleted) wrapperClassName.push("completed");
  if (isSelected) wrapperClassName.push("selected");

  return (
    <div
      className={wrapperClassName.join(" ")}
      onClick={(e) => {
        handleClick(e);
      }}
    >
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
        <span className="TodoItem__title">{title}</span>
      </div>
      <div className="buttons__wrapper">
        {!isPending && (
          <>
            {/* <Button>Edit</Button> */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(id);
              }}
            >
              X
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
