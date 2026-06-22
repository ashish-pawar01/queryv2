import QueryDefinition from "./queryDefinition.model.js";

export const createQueryDefinition = async (req, res) => {
  try {
    const data = req.body;

    const queryDefinition = await QueryDefinition.create({
      ...data,

      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Query Definition Created",
      data: queryDefinition,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQueryDefinitions = async (req, res) => {
  try {
    const queries = await QueryDefinition.find({
      isDeleted: false,
    })
      .populate("category")
      .populate("module");

    res.json({
      success: true,
      data: queries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQueryDefinitionById = async (req, res) => {
  try {
    const query = await QueryDefinition.findById(req.params.id)
      .populate("category")
      .populate("module");

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    res.json({
      success: true,
      data: query,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQueryDefinition = async (req, res) => {
  try {
    const query = await QueryDefinition.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    const snapshot = JSON.parse(JSON.stringify(query));

    query.versions.push({
      versionNumber: query.currentVersion,

      changedBy: req.user._id,

      snapshot,
    });

    query.currentVersion += 1;

    Object.assign(query, req.body);

    query.updatedBy = req.user._id;

    await query.save();

    res.json({
      success: true,
      message: "Query Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteQueryDefinition = async (req, res) => {
  try {
    const query = await QueryDefinition.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    query.isDeleted = true;

    await query.save();

    res.json({
      success: true,
      message: "Query Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
