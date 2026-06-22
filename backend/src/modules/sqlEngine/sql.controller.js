import QueryDefinition from "../queryDefinitions/queryDefinition.model.js";

import QueryHistory from "../history/queryHistory.model.js";

import AuditLog from "../audit/audit.model.js";

import { generateSql } from "./sqlGenerator.service.js";

import { checkQueryAccess } from "./access.service.js";

export const generateQuery = async (req, res) => {
  try {
    const { queryId, payload } = req.body;

    const query = await QueryDefinition.findById(queryId)
      .populate("accessControl.allowedRoles")
      .populate("accessControl.allowedUsers")
      .populate("accessControl.deniedUsers");

    if (!query) {
      return res.status(404).json({
        success: false,
      });
    }

    if (query.status !== "PUBLISHED") {
      return res.status(400).json({
        success: false,
        message: "Query not published",
      });
    }

    const allowed = checkQueryAccess(req.user, query);

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const sql = generateSql(query, payload);

    await QueryHistory.create({
      user: req.user._id,

      queryDefinition: query._id,

      queryName: query.name,

      inputs: payload,

      generatedSql: sql,
    });

    await AuditLog.create({
      user: req.user._id,

      action: "QUERY_GENERATED",

      module: "QUERY_ENGINE",

      description: query.name,
    });

    res.json({
      success: true,
      sql,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
