import express from "express";

import protect from "../../middleware/auth.middleware.js";

import { adminDashboard, activeUsers } from "./dashboard.controller.js";

const router = express.Router();

router.get("/admin", protect, adminDashboard);

export default router;
