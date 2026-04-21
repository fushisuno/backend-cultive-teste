import express from "express";
import { protectRoute, allowRoles } from "../middleware/auth.middleware.js";
import {
  createFamilia,
  getFamiliaById,
  updateFamilia,
  deleteFamilia,
  getAllFamilias,
  addMembro,
  removeMembro,
} from "../controllers/familia.controller.js";

const router = express.Router();

// list / create
router.get("/", protectRoute, allowRoles("gestor", "admin"), getAllFamilias);
router.post("/", protectRoute, allowRoles("gestor", "admin"), createFamilia);

// single
router.get("/:id", protectRoute, allowRoles("gestor", "admin"), getFamiliaById);
router.put("/:id", protectRoute, allowRoles("gestor", "admin"), updateFamilia);
router.delete("/:id", protectRoute, allowRoles("admin"), deleteFamilia);

router.post(
  "/:familiaId/membros",
  protectRoute,
  allowRoles("gestor", "admin"),
  addMembro
);

router.delete(
  "/membros/:membroId",
  protectRoute,
  allowRoles("gestor", "admin"),
  removeMembro
);

export default router;
