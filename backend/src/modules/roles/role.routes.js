import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "./role.controller.js";

const router = express.Router();

router.get("/", protect, getRoles);
router.get("/:id", protect, getRoleById);

router.post("/", protect, createRole);

router.put("/:id", protect, updateRole);

router.delete("/:id", protect, deleteRole);

export default router;