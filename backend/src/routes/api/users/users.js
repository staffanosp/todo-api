import express from "express";
import * as UserController from "../../../controllers/UserController.js";
import verifyToken from "../../../utils/verifyToken.js";

const getRouter = () => {
  const router = express.Router();

  router.route("/login").post(UserController.login);
  router.route("/verify").get(verifyToken, UserController.verifyToken);

  return router;
};

export default getRouter;
