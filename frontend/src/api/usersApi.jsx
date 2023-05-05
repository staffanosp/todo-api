import { fetchWithToken } from "../../../backend/src/utils/utils";

const BASE_ENDPOINT = "http://localhost:3000/api/users";

const userLogin = async (username, password) => {
  // const dummyUser = { username: "test", password: "asdf", userId: "12345" };

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

  // if (res?.ok) {
  //   return await res.json();
  // } else {
  //   return `HTTP Response Code: ${res?.status}`;
  // }
};

const verifyToken = async () => {
  const res = await fetchWithToken(`${BASE_ENDPOINT}/verifyToken`);

  const data = await res.json();
  return data;
};

export { BASE_ENDPOINT, userLogin, verifyToken };
