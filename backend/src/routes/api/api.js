import express from "express";
import getTodosRouter from "./todos/todos.js";
import getUsersRouter from "./users/users.js";

const getRouter = () => {
  const router = express.Router();

  router.use("/todos", getTodosRouter());
  router.use("/users", getUsersRouter());

  router.get("/", (req, res) => {
    res.status(404).send("nothing here");
  });

  return router;
};

export default getRouter;
