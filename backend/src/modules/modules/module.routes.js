import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";

import {
  createModule,
  getModules,
  getModuleById,
  updateModule,
  deleteModule,
  toggleModuleStatus,
  getModuleQueries,
} from "./module.controller.js";

const router = express.Router();

router.post("/", protect, authorize("module.create"), createModule);

router.get("/", protect, authorize("module.view"), getModules);

router.get("/:id", protect, authorize("module.view"), getModuleById);

router.get("/:id/queries", protect, getModuleQueries);

router.put("/:id", protect, authorize("module.edit"), updateModule);

router.delete("/:id", protect, authorize("module.delete"), deleteModule);

router.patch(
  "/toggle-status/:id",
  protect,
  authorize("module.edit"),
  toggleModuleStatus,
);

export default router;
