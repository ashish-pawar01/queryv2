import QueryDefinition from "./queryDefinition.model.js";
import { generateSql } from "../sqlEngine/sqlGenerator.service.js";

export const previewQuery = async (req, res) => {
  try {
    const query = await QueryDefinition.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    const sql = generateSql(query, req.body);

    return res.status(200).json({
      success: true,
      sql,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};