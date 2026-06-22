import Favorite from "./favorite.model.js";
import asyncHandler from "../../core/asyncHandler.js";
import ApiResponse from "../../core/ApiResponse.js";

export const addFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.create({
    user: req.user._id,
    queryDefinition: req.body.queryDefinition,
  });

  return ApiResponse.success(res, favorite, "Added to favorites", 201);
});

export const removeFavorite = asyncHandler(async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);

  return ApiResponse.success(res, null, "Favorite removed");
});

export const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({
    user: req.user._id,
  }).populate("queryDefinition");

  return ApiResponse.success(res, favorites);
});
