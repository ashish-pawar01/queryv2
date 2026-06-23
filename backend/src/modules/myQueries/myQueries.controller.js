import QueryDefinition from "../queryDefinitions/queryDefinition.model.js";

export const getMyQueries = async (req, res) => {
  try {
    const userId = req.user._id;
    const roleId = req.user.role;

    const queries = await QueryDefinition.find({
      status: "PUBLISHED",
      isActive: true,

      deniedUsers: {
        $ne: userId,
      },

      $or: [
        {
          assignedUsers: userId,
        },
        {
          assignedRoles: roleId,
        },
      ],
    })
      .populate("category", "name")
      .populate("module", "name")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: queries.length,
      data: queries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyQueryById = async (req, res) => {
  try {
    const userId = req.user._id;
    const roleId = req.user.role;

    const query = await QueryDefinition.findOne({
      _id: req.params.id,

      status: "PUBLISHED",

      isActive: true,

      deniedUsers: {
        $ne: userId,
      },

      $or: [
        {
          assignedUsers: userId,
        },
        {
          assignedRoles: roleId,
        },
      ],
    })
      .populate("category", "name")
      .populate("module", "name");

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found or access denied",
      });
    }

    res.status(200).json({
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