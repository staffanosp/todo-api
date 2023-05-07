import jwt from "jsonwebtoken";

const login = (req, res) => {
  const { username, password } = req.body;

  const user = {
    username: process.env.USER_USERNAME,
    password: process.env.USER_PASSWORD,
  };

  if (username !== user.username || password !== user.password) {
    return res.sendStatus(401);
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).send({ token });
};

const verifyToken = (req, res) => {
  //the verification is done in the middleware

  const { token } = req;
  res.status(200).send({ token });
};

export { login, verifyToken };
