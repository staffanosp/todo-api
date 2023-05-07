import { fetchWithToken } from "../utils/utils";

const BASE_ENDPOINT = "http://localhost:3000/api/users";

const userLogin = async (username, password) => {
  const res = await fetch(`${BASE_ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  try {
    return await res.json();
  } catch {
    return {};
  }
};

const verifyToken = async () => {
  const res = await fetchWithToken(`${BASE_ENDPOINT}/verify`);

  const data = await res.json();
  return data;
};

export { BASE_ENDPOINT, userLogin, verifyToken };
