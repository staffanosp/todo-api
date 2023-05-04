import { fetchWithToken } from "../../../backend/src/utils/utils";

const BASE_ENDPOINT = "http://localhost:3000/api/todos";

const getTodos = async () => {
  const res = await fetchWithToken(BASE_ENDPOINT);
  const data = await res.json();
  return data;
};

const addTodo = async (newTodo) => {
  const res = await fetchWithToken(BASE_ENDPOINT, {
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
  const res = await fetchWithToken(`${BASE_ENDPOINT}/${id}`, {
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
  const res = await fetchWithToken(`${BASE_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};

const deleteTodos = async (ids) => {
  const res = await fetchWithToken(BASE_ENDPOINT, {
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
  BASE_ENDPOINT,
  getTodos,
  addTodo,
  deleteTodos,
  updateTodo,
  deleteTodo,
};
