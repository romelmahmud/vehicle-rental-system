import { Request, Response } from "express";
import { userServices } from "./user.service";

// user controller
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  // to make sure logged in user is not undefined
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No user logged in",
    });
  }
  const targetUserId = Number(req.params.userId);
  const loggedInUser = req.user;

  // Checking if user updating own profile
  if (loggedInUser.role === "customer" && loggedInUser.id !== targetUserId) {
    return res.status(403).json({
      success: false,
      message: "Customers can only update their own profile",
    });
  }
  // Checking only admin can update role
  if (req.body.role && loggedInUser.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Only admins can update user roles",
    });
  }
  try {
    const result = await userServices.updateUser(
      req.params.userId as string,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const userControllers = {
  getAllUsers,
  updateUser,
};
