import express from "express";

import jwt from "jsonwebtoken";
import verifyToken from "../../../utils/verifyToken.js";

const getRouter = () => {
  const router = express.Router();

  router.route("/login").post((req, res) => {
    const { username, password } = req.body;

    const user = {
      username: process.env.USER_USERNAME,
      password: process.env.USER_PASSWORD,
    };

    if (username !== user.username || password !== user.password) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).send({ token });
  });

  router.route("/verifyToken").get(verifyToken, (req, res) => {
    const { token } = req;
    res.status(200).send({ token });
  });

  return router;
};

export default getRouter;
