import { Sequelize } from "sequelize";

const local = true; //true | false

let params, msg;

if (local) {
  params = {
    dialect: "sqlite",
    storage: "./temp/db.sqlite",
  };
  msg = "Running local sqlite.";
} else {
  params = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_DBNAME}`;
  msg = "Running remote postgres";
}

console.log(msg);

const sequelize = new Sequelize(params);

export { sequelize };
