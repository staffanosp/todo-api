import express from "express";
import todosRouter from "./todos/todos.js";

const router = express.Router();
router.use("/todos", todosRouter);

router.get("/", (req, res) => {
  res.status(404).send("nothing here");
});

export default router;
