// booking route
import express from "express";
import auth from "../../middleware/auth";
import { checkReturningVehicle } from "../../middleware/checkReturnVehicle";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  auth("admin", "customer"),
  checkReturningVehicle,
  bookingController.createBooking
);
router.get(
  "/",
  auth("admin", "customer"),
  checkReturningVehicle,
  bookingController.getAllBookings
);
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  checkReturningVehicle,
  bookingController.updateBooking
);

export const bookingRoutes = router;
