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

export { fakeSlowServer };
