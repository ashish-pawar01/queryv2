import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "./favorite.controller.js";

const router = express.Router();

router.get("/", protect, getFavorites);

router.post("/", protect, addFavorite);

router.delete("/:id", protect, removeFavorite);

export default router;
