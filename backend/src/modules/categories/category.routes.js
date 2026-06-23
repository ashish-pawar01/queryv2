import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  getCategoryModules,
  getModuleQueries,
} from "./category.controller.js";

const router = express.Router();

router.post("/", protect, authorize("category.create"), createCategory);

router.get("/", protect, authorize("category.view"), getCategories);

router.get("/:id", protect, authorize("category.view"), getCategoryById);

router.get("/:id/modules", protect, getCategoryModules);

router.get("/:id/queries", protect, getModuleQueries);

router.put("/:id", protect, authorize("category.edit"), updateCategory);

router.delete("/:id", protect, authorize("category.delete"), deleteCategory);

router.patch(
  "/toggle-status/:id",
  protect,
  authorize("category.edit"),
  toggleCategoryStatus,
);

export default router;
