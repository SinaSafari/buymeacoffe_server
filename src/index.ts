import "dotenv-safe/config";
import express, { Application } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";
import dbConfig from "./config/database";

const PORT = process.env.PORT || 8000;

const app: Application = express();

// application middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

// swagger support
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/docs/swagger.json",
    },
  })
);

app.use(Router);

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("server isrunning on port ", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
