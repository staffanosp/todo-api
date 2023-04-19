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

const updateTodo = async (id, body) => {
  const res = await fetch(`${TODOS_ENDPOINT}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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

const deleteTodos = async (ids) => {
  const res = await fetch(`${TODOS_ENDPOINT}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });

  const data = await res.json();
  return data;
};

export {
  TODOS_ENDPOINT,
  getTodos,
  addTodo,
  deleteTodos,
  updateTodo,
  deleteTodo,
};
