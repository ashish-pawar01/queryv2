import express from "express";

import protect from "../../middleware/auth.middleware.js";

import { getActivityFeed } from "./activity.controller.js";

const router = express.Router();

router.get("/", protect, getActivityFeed);

export default router;