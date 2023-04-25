const TODOS_ENDPOINT = "http://localhost:3000/api/todos";

//state and "state setters"
let todos = [];
let isLoadingCounter = 0;

const setTodos = (newValue) => {
  todos = newValue;
  render();
};

const setIsLoadingCounter = (newValue) => {
  isLoadingCounter = newValue;
  render();
};

//elements
const todoListEl = document.getElementById("todoList");
const todoListFormEl = document.getElementById("todoListForm");
const todoListInputEl = document.getElementById("todoListInput");

//event listeners
todoListFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  todoListInputEl.value = "";

  await mutate(() => addTodo({ title: formProps.input }));
});

//functions
async function mutate(mutation) {
  setIsLoadingCounter(++isLoadingCounter);
  await mutation();
  await revalidate();
  setIsLoadingCounter(--isLoadingCounter);
}

async function revalidate() {
  setTodos(await getTodos());
}

async function getTodos() {
  const res = await fetch(TODOS_ENDPOINT);
  const data = await res.json();
  return data;
}

async function addTodo(newTodo) {
  const res = await fetch(`${TODOS_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  const data = await res.json();
  return data;
}

async function deleteTodo(id) {
  const res = await fetch(`${TODOS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
}

function render() {
  todoListEl.innerHTML = "";

  todos.forEach((todo) => {
    const newTodoItem = document.createElement("div");

    newTodoItem.innerHTML = todo.title;

    const newDeleteButton = document.createElement("button");

    newDeleteButton.type = "button";
    newDeleteButton.innerHTML = "DELETE";
    newDeleteButton.addEventListener("click", async () => {
      await mutate(() => deleteTodo(todo.id));
    });

    newTodoItem.append(newDeleteButton);

    todoListEl.append(newTodoItem);
  });

  if (isLoadingCounter) {
    const isLoadingCounterEl = document.createElement("div");
    isLoadingCounterEl.innerHTML = "Loading...";
    todoListEl.append(isLoadingCounterEl);
  }
}

async function main() {
  setIsLoadingCounter(++isLoadingCounter);
  await revalidate();
  setIsLoadingCounter(--isLoadingCounter);
}

//entry point
main();
