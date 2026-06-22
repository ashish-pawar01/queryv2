import express from "express";

import protect from "../../middleware/auth.middleware.js";

import { generateQuery } from "./sql.controller.js";

const router = express.Router();

router.post("/generate", protect, generateQuery);

export default router;
