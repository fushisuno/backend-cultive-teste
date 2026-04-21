import express from "express";
import {
  getAllHortas,
  getHortaById,
  createHorta,
  updateHorta,
  deleteHorta,
} from "../controllers/horta.controller.js";
import { protectRoute, allowRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllHortas);
router.get("/:id", protectRoute, getHortaById);
router.post("/", protectRoute, allowRoles("gestor", "admin"), createHorta);
router.put("/:id", protectRoute, allowRoles("gestor", "admin"), updateHorta);
router.delete("/:id", protectRoute, allowRoles("admin"), deleteHorta);

export default router;