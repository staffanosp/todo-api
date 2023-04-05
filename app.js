import "./utils/config.js";
import express from "express";
import morgan from "morgan";
import { sequelize } from "./utils/database.js";
import apiRouter from "./routes/api/api.js";
import { sync as TodoModelSync } from "./controllers/TodoController.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use("/api", apiRouter);

//start

(async () => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });

  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // TodoModelSync({ alter: true });
  // TodoModelSync({ force: true });
  TodoModelSync();
})();
