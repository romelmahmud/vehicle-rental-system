import express from "express";
import initDB from "./config/db";

const app = express();

initDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!");
});

export default app;
