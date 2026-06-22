import express from "express";

import protect from "../../middleware/auth.middleware.js";

import authorize from "../../middleware/authorize.middleware.js";

import {
  assignRole,
  assignUser,
  denyUser,
  removeRole,
  removeDeniedUser,
  removeUser,
} from "./queryAssignment.controller.js";

import {
  createQueryDefinition,
  getQueryDefinitions,
  getQueryDefinitionById,
  updateQueryDefinition,
  deleteQueryDefinition,
} from "./queryDefinition.controller.js";

import { publishQuery, archiveQuery } from "./queryPublish.controller.js";

import { rollbackVersion } from "./queryRollback.controller.js";

const router = express.Router();

router.post("/", protect, authorize("query.create"), createQueryDefinition);

router.get("/", protect, authorize("query.view"), getQueryDefinitions);

router.get("/:id", protect, authorize("query.view"), getQueryDefinitionById);

router.put("/:id", protect, authorize("query.edit"), updateQueryDefinition);

router.delete(
  "/:id",
  protect,
  authorize("query.delete"),
  deleteQueryDefinition,
);

router.patch("/:id/assign-role", protect, authorize("query.edit"), assignRole);

router.patch("/:id/assign-user", protect, authorize("query.edit"), assignUser);

router.patch("/:id/deny-user", protect, authorize("query.edit"), denyUser);

router.patch("/publish/:id", protect, authorize("query.publish"), publishQuery);

router.patch("/archive/:id", protect, authorize("query.archive"), archiveQuery);

router.patch("/:id/remove-role", protect, authorize("query.edit"), removeRole);

router.patch("/:id/remove-user", protect, authorize("query.edit"), removeUser);

router.patch(
  "/:id/remove-denied-user",
  protect,
  authorize("query.edit"),
  removeDeniedUser,
);

router.patch(
  "/rollback/:id",
  protect,
  authorize("query.rollback"),
  rollbackVersion,
);

export default router;
