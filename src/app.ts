import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.route";
import { bookingRoutes } from "./modules/booking/booking.route";
import { userRoutes } from "./modules/user/user.route";
import { vehicleRoutes } from "./modules/vehicle/vehicle.route";

const app = express();

initDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);

// handle invalid routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});
export default app;
