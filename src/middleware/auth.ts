import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

const auth = (...roles: Array<"admin" | "customer">) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res
          .status(401)
          .json({
            success: false,
            message: "Access denied: No token provided",
          });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as jwt.JwtPayload;
      console.log(decoded);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden: Unauthorized" });
      }
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
