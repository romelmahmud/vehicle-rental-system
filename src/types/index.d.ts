import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request extends JwtPayload {
      user?: {
        id: string;
        name: string;
        email: string;
        role: "admin" | "customer";
      };
    }
  }
}
