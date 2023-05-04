import express from "express";

import jwt from "jsonwebtoken";
import { dummyUser } from "../../../utils/utils.js";
import verifyToken from "../../../utils/verifyToken.js";

const getRouter = () => {
  const router = express.Router();

  router.route("/login").post((req, res) => {
    const { userName, userId } = dummyUser;

    const token = jwt.sign({ userName, userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).send({ token });
  });

  router.route("/verifyToken").get(verifyToken, (req, res) => {
    const { token } = req;
    res.status(200).send({ token });
  });

  return router;
};

export default getRouter;
