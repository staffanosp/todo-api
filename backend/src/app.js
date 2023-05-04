import "./utils/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { sequelize } from "./utils/database.js";
import getApiRouter from "./routes/api/api.js";
import { sync as TodoModelSync } from "./controllers/TodoController.js";
import { fakeSlowServer } from "./utils/utils.js";

const main = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.status(404).send("nothing here");
  });

  app.use(morgan("tiny"));
  app.use(cors());
  // app.use(fakeSlowServer(0));
  app.use(fakeSlowServer(800));
  app.use(express.json());
  app.use("/api", getApiRouter());

  //start

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
