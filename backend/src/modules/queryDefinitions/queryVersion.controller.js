import QueryDefinition from "./queryDefinition.model.js";

export const getVersions = async (req, res) => {
  try {
    const query = await QueryDefinition.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    return res.status(200).json({
      success: true,
      versions: query.versionHistory || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};