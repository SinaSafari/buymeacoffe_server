import { ConnectionOptions } from "typeorm";
import { User, Post, Like } from "../models";

// const config: ConnectionOptions = {
//   type: "postgres",
//   host: process.env.POSTGRES_HOST || "localhost",
//   port: Number(process.env.POSTGRES_PORT) || 5432,
//   username: process.env.POSTGRES_USER || "postgres",
//   password: process.env.POSTGRES_PASSWORD || "postgres",
//   database: process.env.POSTGRES_DB || "postgres",
//   entities: [User, Post, Comment],
//   synchronize: true,
// };

function generateConfigObj(): ConnectionOptions {
  const entitiesArr = [User, Post, Like];
  if (process.env.APP_MODE === "development") {
    console.log("development");
    return {
      type: "sqlite",
      database: "./mydb.sqlite",
      dropSchema: true,
      entities: entitiesArr,
      synchronize: true,
      logging: false,
    };
  }
  return {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "postgres",
    entities: entitiesArr,
    synchronize: true,
  };
}

const config = generateConfigObj();

export default config;
