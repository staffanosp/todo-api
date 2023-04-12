import { Todo, validateTodo } from "../models/Todo.js";

const sync = async (options = {}) => await Todo.sync(options);

const getAllTodos = async (_, res) => {
  try {
    const todos = await Todo.findAll();
    res.send(todos);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const createNewTodo = async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { title, completed } = req.body;
    const todo = await Todo.create({ title, completed });
    res.json(todo);
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

    const { error } = validateTodo(req.body, { method: "patch" });
    if (error) return res.status(400).send(error.details[0].message);

    await todo.update(req.body);

    res.send(todo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export { sync, getAllTodos, createNewTodo, getTodo, deleteTodo, updateTodo };
