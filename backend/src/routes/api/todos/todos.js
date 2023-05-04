import express from "express";
import * as TodoController from "../../../controllers/TodoController.js";
import verifyToken from "../../../utils/verifyToken.js";

const getRouter = () => {
  const router = express.Router();
  router.use(verifyToken);

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
