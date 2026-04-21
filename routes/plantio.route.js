import express from "express";
import {
  getAllPlantios,
  getPlantioById,
  createPlantio,
  updatePlantio,
  deletePlantio,
} from "../controllers/plantio.controller.js";
import { protectRoute, allowRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllPlantios);
router.get("/:id", protectRoute, getPlantioById);
router.post("/", protectRoute, allowRoles("gestor", "admin"), createPlantio);
router.put("/:id", protectRoute, allowRoles("gestor", "admin"), updatePlantio);
router.delete("/:id", protectRoute, allowRoles("gestor", "admin"), deletePlantio);

export default router;
