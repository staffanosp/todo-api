const fetchWithToken = async (...theArgs) => {
  const token = localStorage.getItem("token");

  if (token) {
    theArgs[1] = {
      ...theArgs[1],
      headers: { ...theArgs[1]?.headers, Authorization: `Bearer ${token}` },
    };
  }

  return await fetch(...theArgs);
};

export { fetchWithToken };
