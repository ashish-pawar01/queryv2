import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
  getMyQueries,
  getMyQueryById,
} from "./myQueries.controller.js";

const router = express.Router();

router.get("/", protect, getMyQueries);

router.get("/:id", protect, getMyQueryById);

export default router;