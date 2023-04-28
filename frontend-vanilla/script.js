import { getTodos, addTodo, deleteTodo, updateTodo } from "./api.js";

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

function render() {
  const inputIsDisabled = isLoadingCounter > 0;
  todoListEl.innerHTML = "";

  todos.forEach((todo) => {
    const newTodoItem = document.createElement("div");

    newTodoItem.innerHTML = todo.title;

    const newDeleteButton = document.createElement("button");
    newDeleteButton.disabled = inputIsDisabled;
    newDeleteButton.type = "button";
    newDeleteButton.innerHTML = "DELETE";
    newDeleteButton.addEventListener("click", async () => {
      await mutate(() => deleteTodo(todo.id));
    });

    const checkBoxInput = document.createElement("input");
    checkBoxInput.disabled = inputIsDisabled;
    checkBoxInput.type = "checkbox";
    checkBoxInput.checked = todo.isCompleted;
    checkBoxInput.addEventListener("change", async function (e) {
      await mutate(() => updateTodo(todo.id, { isCompleted: this.checked }));
    });

    newTodoItem.prepend(checkBoxInput);
    newTodoItem.append(newDeleteButton);
    todoListEl.append(newTodoItem);
  });

  todoListInputEl.disabled = inputIsDisabled;

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
