import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";

import { getSettings, updateSettings } from "./settings.controller.js";

const router = express.Router();

router.get("/", protect, authorize("settings.view"), getSettings);

router.put("/", protect, authorize("settings.edit"), updateSettings);

export default router;
