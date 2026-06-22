import User from "../users/user.model.js";
import Category from "../categories/category.model.js";
import Module from "../modules/module.model.js";
import QueryDefinition from "../queryDefinitions/queryDefinition.model.js";

import asyncHandler from "../../core/asyncHandler.js";
import ApiResponse from "../../core/ApiResponse.js";

export const globalSearch = asyncHandler(async (req, res) => {
  const q = req.query.q || "";

  const regex = new RegExp(q, "i");

  const [users, categories, modules, queries] = await Promise.all([
    User.find({
      $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
    }).limit(10),

    Category.find({
      $or: [{ name: regex }, { code: regex }],
    }).limit(10),

    Module.find({
      $or: [{ name: regex }, { code: regex }],
    }).limit(10),

    QueryDefinition.find({
      $or: [{ name: regex }, { targetTable: regex }],
    }).limit(10),
  ]);

  return ApiResponse.success(
    res,
    {
      users,
      categories,
      modules,
      queries,
    },
    "Search completed",
  );
});
