import express from "express";
import auth from "../../middleware/auth";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/", auth("admin"), userControllers.getAllUsers);
router.put("/:id", auth("admin", "customer"), userControllers.updateUser);

export const userRoutes = router;
