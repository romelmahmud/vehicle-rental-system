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
      const result = await bookingServices.getBooking(Number(req.user.id));
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
    const bookingId = req.params.bookingId as string;
    const data = req.body;
    const result = await bookingServices.updateBooking(bookingId, data);
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
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
