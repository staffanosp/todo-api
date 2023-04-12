import "./utils/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { sequelize } from "./utils/database.js";
import apiRouter from "./routes/api/api.js";
import { sync as TodoModelSync } from "./controllers/TodoController.js";
import { fakeSlowServer } from "./utils/utils.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(cors());
app.use(fakeSlowServer(1000));
app.use("/api", apiRouter);

//start

const main = async () => {
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
};

main();
