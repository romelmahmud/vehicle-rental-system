import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post("/signup", authControllers.registerUser);
router.post("/signin", authControllers.signInUser);

export const authRoutes = router;
