function asyncTimeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const fakeSlowServer = (delayMs) => {
  return async (req, res, next) => {
    console.log("—————————————");
    console.log(req.body);
    console.log(`Fake Slow Server: ${delayMs}ms`);
    await asyncTimeout(delayMs);
    next();
  };
};

const fetchWithToken = async (...theArgs) => {
  const token = localStorage.getItem("token");

  theArgs[1] = {
    ...theArgs[1],
    headers: { ...theArgs[1]?.headers, Authorization: `Bearer ${token}` },
  };

  return await fetch(...theArgs);
};

export { fakeSlowServer, fetchWithToken };
