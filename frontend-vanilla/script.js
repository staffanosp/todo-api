const todoListEl = document.getElementById("todoList");
const todoListFormEl = document.getElementById("todoListForm");

const TODOS_ENDPOINT = "http://localhost:3000/api/todos";

const getTodos = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const addTodo = async (newTodo) => {
  const res = await fetch(`${TODOS_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  const data = await res.json();
  return data;
};

const deleteTodo = async (id) => {
  const res = await fetch(`${TODOS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};

const render = () => {
  todoListEl.innerHTML = "";

  todos.forEach((todo) => {
    const newTodoItem = document.createElement("div");

    newTodoItem.innerHTML = todo.title;

    const newDeleteButton = document.createElement("button");

    newDeleteButton.type = "button";
    newDeleteButton.innerHTML = "DELETE";
    newDeleteButton.addEventListener("click", async () => {
      await deleteTodo(todo.id);
      await update();
    });

    newTodoItem.append(newDeleteButton);

    todoListEl.append(newTodoItem);
  });
};

let todos = [];

const setTodos = (newValue) => {
  todos = newValue;
  render();
};

const update = async () => {
  setTodos(await getTodos(TODOS_ENDPOINT));
};

todoListFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  await addTodo({ title: formProps.input });

  await update();
});

await update();
