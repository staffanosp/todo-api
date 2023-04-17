import { sequelize } from "../utils/database.js";
import { DataTypes } from "sequelize";
import Joi from "joi";

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    underscored: true,
  }
);

function validateTodo(todo, options = { method: "post" }) {
  const { method } = options;

  const schema = Joi.object({
    title: Joi.string()
      // .min(3)
      .alter({
        post: (schema) => schema.required(),
      }),
    isCompleted: Joi.boolean(),
  })
    .min(1)
    .messages({ "object.min": "Empty request" });

  return schema.tailor(method).validate(todo);
}

export { Todo, validateTodo };
