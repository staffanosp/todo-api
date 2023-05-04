import express from "express";
import * as TodoController from "../../../controllers/TodoController.js";

const getRouter = () => {
  const router = express.Router();
  router.use(express.json());

  router
    .route("/")
    .get(TodoController.getAllTodos)
    .post(TodoController.createNewTodo)
    .delete(TodoController.deleteTodos);

  router
    .route("/:id")
    .get(TodoController.getTodo)
    .delete(TodoController.deleteTodo)
    .patch(TodoController.updateTodo);

  return router;
};

export default getRouter;
