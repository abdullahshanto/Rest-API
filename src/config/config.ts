import {config as conf} from "dotenv"

conf();

const _config = {
  port : process.env.PORT,
  dbURL: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV || "development",
  jssecret: process.env.JWT_SECRET
};

export const config = Object.freeze(_config)//read only
