const TODOS_ENDPOINT = "http://localhost:3000/api/todos";

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

export { getTodos, addTodo, deleteTodo, updateTodo };
