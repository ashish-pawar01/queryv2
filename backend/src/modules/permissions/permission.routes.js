import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
} from "./permission.controller.js";

const router = express.Router();

router.get("/", protect, getPermissions);

router.get("/:id", protect, getPermissionById);

router.post("/", protect, createPermission);

router.put("/:id", protect, updatePermission);

router.delete("/:id", protect, deletePermission);

export default router;