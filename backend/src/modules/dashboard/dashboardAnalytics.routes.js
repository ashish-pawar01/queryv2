import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
  getDashboardAnalytics,
} from "./dashboardAnalytics.controller.js";

const router = express.Router();

router.get(
  "/analytics",
  protect,
  getDashboardAnalytics
);

export default router;