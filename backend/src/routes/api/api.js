import express from "express";
import getTodosRouter from "./todos/todos.js";

const getRouter = () => {
  const router = express.Router();

  router.use("/todos", getTodosRouter());

  router.get("/", (req, res) => {
    res.status(404).send("nothing here");
  });

  return router;
};

export default getRouter;
