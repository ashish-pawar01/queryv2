import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import categoryRoutes from "../modules/categories/category.routes.js";
import sqlRoutes from "../modules/sqlEngine/sql.routes.js";
import favoriteRoutes from "../modules/favorites/favorite.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import searchRoutes from "../modules/search/search.routes.js";
import settingsRoutes from "../modules/settings/settings.routes.js";
import queryDefinitionRoutes from "../modules/queryDefinitions/queryDefinition.routes.js";
import moduleRoutes from "../modules/modules/module.routes.js";
import historyRoutes from "../modules/history/history.routes.js";
import auditRoutes from "../modules/audit/audit.routes.js";
import myQueriesRoutes from "../modules/myQueries/myQueries.routes.js";
import roleRoutes from "../modules/roles/role.routes.js";
import permissionRoutes from "../modules/permissions/permission.routes.js";
import dashboardAnalyticsRoutes from "../modules/dashboard/dashboardAnalytics.routes.js";
import activityRoutes from "../modules/activity/activity.routes.js";

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

router.use("/history", historyRoutes);

router.use("/audit", auditRoutes);

router.use("/my-queries", myQueriesRoutes);

router.use("/permissions", permissionRoutes);

router.use("/dashboard", dashboardAnalyticsRoutes);

router.use("/activity-feed", activityRoutes);

export default router;
