import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import roleRoutes from "../modules/rbac/role.routes.js";
import categoryRoutes from "../modules/categories/category.routes.js";
import sqlRoutes from "../modules/sqlEngine/sql.routes.js";
import favoriteRoutes from "../modules/favorites/favorite.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import searchRoutes from "../modules/search/search.routes.js";
import settingsRoutes from "../modules/settings/settings.routes.js";
import queryDefinitionRoutes from "../modules/queryDefinitions/queryDefinition.routes.js";
import moduleRoutes from "../modules/modules/module.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/roles", roleRoutes);

router.use("/categories", categoryRoutes);

router.use("/sql", sqlRoutes);

router.use("/favorites", favoriteRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/search", searchRoutes);

router.use("/settings", settingsRoutes);

router.use("/query-definitions", queryDefinitionRoutes);

router.use("/modules", moduleRoutes);

export default router;
