import { Sequelize } from "sequelize";

const isRemoteDb = process.env.DB_REMOTE === "TRUE";

let params, msg;

if (isRemoteDb) {
  const dbParams = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL,
    port: process.env.DB_PORT,
    name: process.env.DB_DBNAME,
  };

  Object.entries(dbParams).forEach(
    ([k, v]) => (dbParams[k] = encodeURIComponent(v))
  );

  params = `postgres://${dbParams.user}:${dbParams.password}@${dbParams.url}:${dbParams.port}/${dbParams.name}`;
  msg = "Running remote postgres";
} else {
  params = {
    dialect: "sqlite",
    storage: "./temp/db.sqlite",
  };
  msg = "Running local sqlite.";
}

console.log(`DB: ${msg}`);

const sequelize = new Sequelize(params);

export { sequelize };
