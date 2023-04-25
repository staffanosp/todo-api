import express from "express";
import * as TodoController from "../../../controllers/TodoController.js";

const router = express.Router();
router.use(express.json());

router
  .route("/")
  .get(TodoController.getAllTodos) //brief mandatory
  .post(TodoController.createNewTodo) //brief mandatory
  .delete(TodoController.deleteTodos);

router
  .route("/:id")
  .get(TodoController.getTodo) //brief mandatory
  .delete(TodoController.deleteTodo) //brief mandatory
  .patch(TodoController.updateTodo); //brief mandatory

export default router;
