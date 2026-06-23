import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
  getHistory,
  getHistoryById,
  getQueryHistory,
  deleteHistory,
} from "./history.controller.js";

const router = express.Router();

router.get("/", protect, getHistory);

router.get("/:id", protect, getHistoryById);

router.get("/query/:queryId", protect, getQueryHistory);

router.delete("/:id", protect, deleteHistory);

export default router;