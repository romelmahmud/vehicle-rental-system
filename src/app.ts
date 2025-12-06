import express from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.route";
import { userRoutes } from "./modules/user/user.route";
import { vehicleRoutes } from "./modules/vehicle/vehicle.route";

const app = express();

initDB();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!");
});

export default app;
