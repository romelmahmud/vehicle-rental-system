import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  connectionString: process.env.CONNECTION_STRING,
};
