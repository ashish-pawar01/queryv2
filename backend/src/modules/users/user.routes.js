import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleStatus,
} from "./user.controller.js";

const router = express.Router();

router.post("/", protect, authorize("user.create"), createUser);

router.get("/", protect, authorize("user.view"), getUsers);

router.get("/:id", protect, authorize("user.view"), getUserById);

router.put("/:id", protect, authorize("user.edit"), updateUser);

router.delete("/:id", protect, authorize("user.delete"), deleteUser);

router.patch(
  "/toggle-status/:id",
  protect,
  authorize("user.edit"),
  toggleStatus,
);

export default router;
