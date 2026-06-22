import express from "express";

import protect from "../../middleware/auth.middleware.js";

import { getRoles } from "./role.controller.js";

const router = express.Router();

router.get("/", protect, getRoles);

export default router;
