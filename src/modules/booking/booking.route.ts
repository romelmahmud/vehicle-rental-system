// booking route
import express from "express";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.put("/:bookingId", bookingController.updateBooking);

export const bookingRoutes = router;
