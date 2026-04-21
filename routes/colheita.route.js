import express from "express";
import { protectRoute, allowRoles } from "../middleware/auth.middleware.js"; // Presumido
import {
  createColheita,
  getAllColheitas,
  getColheitaById,
  updateColheita,
  deleteColheita,
} from "../controllers/colheita.controller.js";

const router = express.Router();

router.get(
  "/",
  protectRoute,
  allowRoles("gestor", "admin", "cultivador", "voluntario"),
  getAllColheitas
);

router.post("/", protectRoute, allowRoles("gestor", "admin"), createColheita);
router.get(
  "/:id",
  protectRoute,
  allowRoles("gestor", "admin", "cultivador", "voluntario"),
  getColheitaById
);
router.put("/:id", protectRoute, allowRoles("gestor", "admin"), updateColheita);

router.delete(
  "/:id",
  protectRoute,
  allowRoles("gestor", "admin"),
  deleteColheita
);

export default router;
