import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

// vehicle controller
const addVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.addVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicle();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {};

const deleteVehicle = async (req: Request, res: Response) => {};

export const vehicleControllers = {
  addVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
