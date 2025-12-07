import { Request, Response } from "express";
import { vehicleServices } from "../vehicle/vehicle.service";
import { bookingServices } from "./booking.service";

// booking controller
const createBooking = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const vehicleId = data.vehicle_id as string;

    const vehicle = await vehicleServices.getVehicle(vehicleId);
    // checking if vehicle exists
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    // checking if vehicle is available

    if (vehicle.availability_status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available for booking",
      });
    }

    const result = await bookingServices.createBooking(data, vehicle);
    // update vehicle availability_status to booked
    if (result) {
      await vehicleServices.updateVehicle(vehicleId, {
        availability_status: "booked",
      });
    }
    const updatedResult = {
      ...result,
      total_price: parseFloat(result.total_price),
    };

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: updatedResult,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    if (req?.user?.role === "customer") {
      const result = await bookingServices.getAllBookingCustomer(
        Number(req.user.id)
      );
      console.log(result);
      if (!result) {
        return res.status(200).json({
          success: true,
          message: "This user has no bookings",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Booking fetched successfully",
        data: result,
      });
    }
    const result = await bookingServices.getAllBookings();
    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const bookingDetails: any = await bookingServices.getBooking(
      Number(bookingId)
    );

    if (!bookingDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const now = new Date();
    const { status } = req.body;

    // Customer cancels booking
    console.log(req.user);
    if (req.user?.role === "customer" && status === "cancelled") {
      if (new Date(bookingDetails.rent_start_date) <= now) {
        return res.status(400).json({
          success: false,
          message: "Cannot cancel booking after start date",
        });
      }

      const updatedBooking = await bookingServices.updateBooking(
        Number(bookingId),
        status
      );
      // Update vehicle availability
      await vehicleServices.updateVehicle(bookingDetails.vehicle_id, {
        availability_status: "available",
      });

      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: updatedBooking,
      });
    }

    // Admin marks booking as returned

    if (req.user?.role === "admin" && status === "returned") {
      // Update booking
      const updatedBooking = await bookingServices.updateBooking(
        Number(bookingId),
        status
      );

      // Update vehicle availability
      await vehicleServices.updateVehicle(bookingDetails.vehicle_id, {
        availability_status: "available",
      });

      return res.status(200).json({
        success: true,
        message: "Booking marked as returned and vehicle is now available",
        data: updatedBooking,
      });
    }

    // Unauthorized or invalid request

    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this booking",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
