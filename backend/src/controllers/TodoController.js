import { Todo, validateTodo } from "../models/Todo.js";
import Joi from "joi";

const sync = async (options = {}) => await Todo.sync(options);

const getAllTodos = async (_, res) => {
  try {
    const todos = await Todo.findAll({
      order: [["created_at", "DESC"]],
    });
    res.send(todos);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const createNewTodo = async (req, res) => {
  //input validation
  const { error } = validateTodo(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { title, isCompleted } = req.body;
    const todo = await Todo.create({ title, isCompleted });

    res.json(todo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteTodos = async (req, res) => {
  const schema = Joi.object({
    ids: Joi.array().required(),
  })
    .min(1)
    .messages({ "object.min": "Empty request" });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { ids } = req.body;
    const whereClause = { where: { id: ids } };
    const todos = await Todo.findAll({
      ...whereClause,
      attributes: ["id"],
    });

    if (todos.length === 0) return res.status(404).send("no todos was found");

    await Todo.destroy(whereClause);

    res.send(todos);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).send("the todo was not found");

    res.send(todo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).send("the todo was not found");

    await todo.destroy();

    res.send(todo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).send("the todo was not found");

    //input validation
    const { error } = validateTodo(req.body, { method: "patch" });
    if (error) return res.status(400).send(error.details[0].message);

    await todo.update(req.body);

    res.send(todo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export {
  sync,
  getAllTodos,
  createNewTodo,
  getTodo,
  deleteTodo,
  updateTodo,
  deleteTodos,
};
