import Settings from "./settings.model.js";

import asyncHandler from "../../core/asyncHandler.js";
import ApiResponse from "../../core/ApiResponse.js";

export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  return ApiResponse.success(res, settings);
});

export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  Object.assign(settings, req.body);

  await settings.save();

  return ApiResponse.success(res, settings, "Settings updated");
});
