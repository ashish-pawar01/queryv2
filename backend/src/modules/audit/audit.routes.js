import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
  getAuditLogs,
  getAuditLogById,
  getUserAuditLogs,
} from "./audit.controller.js";

const router = express.Router();

router.get("/", protect, getAuditLogs);

router.get("/user/:userId", protect, getUserAuditLogs);

router.get("/:id", protect, getAuditLogById);

export default router;
