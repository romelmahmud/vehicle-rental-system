// auth controller

import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signupUser(req.body);
    delete result.rows[0].password;

    // console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "User registration successful",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.signinUser(email, password);
    delete result.user.password;
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const authControllers = {
  signinUser,
  signupUser,
};
