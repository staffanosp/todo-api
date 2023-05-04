import { fetchWithToken } from "../../../backend/src/utils/utils";

const BASE_ENDPOINT = "http://localhost:3000/api/users";

const userLogin = async () => {
  const res = await fetch(`${BASE_ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

const verifyToken = async (token) => {
  const res = await fetch(`${BASE_ENDPOINT}/verifyToken`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

export { BASE_ENDPOINT, userLogin, verifyToken };
