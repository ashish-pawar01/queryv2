import QueryDefinition from "./queryDefinition.model.js";

export const rollbackVersion = async (req, res) => {
  try {
    const { versionNumber } = req.body;

    const query = await QueryDefinition.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    const version = query.versions.find(
      (v) => v.versionNumber === versionNumber,
    );

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Version not found",
      });
    }

    const snapshot = version.snapshot;

    query.name = snapshot.name;

    query.description = snapshot.description;

    query.queryType = snapshot.queryType;

    query.targetTable = snapshot.targetTable;

    query.manualSql = snapshot.manualSql;

    query.fields = snapshot.fields;

    query.conditions = snapshot.conditions;

    query.accessControl = snapshot.accessControl;

    query.status = snapshot.status;

    await query.save();

    res.json({
      success: true,
      message: "Rollback completed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
