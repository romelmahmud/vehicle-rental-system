// vehicle route
import express from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = express.Router();

router.post("/", vehicleControllers.addVehicle);
router.get("/", vehicleControllers.getAllVehicles);
router.get("/:vehicleId", vehicleControllers.getVehicle);
router.put("/:vehicleId", vehicleControllers.updateVehicle);
router.delete("/:vehicleId", vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
