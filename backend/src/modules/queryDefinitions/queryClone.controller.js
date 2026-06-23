import QueryDefinition from "./queryDefinition.model.js";

export const cloneQuery = async (req, res) => {
  try {
    const sourceQuery = await QueryDefinition.findById(req.params.id);

    if (!sourceQuery) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    const clonedQuery = await QueryDefinition.create({
      ...sourceQuery.toObject(),

      _id: undefined,

      name: `${sourceQuery.name} (Copy)`,

      version: 1,

      status: "DRAFT",

      assignedUsers: [],

      assignedRoles: [],

      deniedUsers: [],

      createdAt: undefined,

      updatedAt: undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Query cloned successfully",
      data: clonedQuery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
