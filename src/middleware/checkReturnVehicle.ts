import { NextFunction, Request, Response } from "express";
import { pool } from "../config/db";
import { vehicleServices } from "../modules/vehicle/vehicle.service";

export const checkReturningVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find bookings that are expired but still active
    const { rows: expiredBookings } = await pool.query(
      `SELECT id, vehicle_id 
       FROM bookings 
       WHERE rent_end_date < NOW() AND status = 'active'`
    );

    for (const booking of expiredBookings) {
      // Update booking status
      await pool.query(
        `UPDATE bookings SET status = 'returned', updated_at = NOW() WHERE id = $1`,
        [booking.id]
      );

      // Update vehicle availability
      await vehicleServices.updateVehicle(booking.vehicle_id, {
        availability_status: "available",
      });
    }

    next();
  } catch (err) {
    console.error("Error updating expired bookings:", err);
    next();
  }
};
