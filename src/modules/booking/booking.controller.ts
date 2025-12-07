import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

// booking controller
const createBooking = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await bookingServices.createBooking(data);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
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
