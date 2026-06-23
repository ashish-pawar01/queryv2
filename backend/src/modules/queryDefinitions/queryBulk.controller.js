import QueryDefinition from "./queryDefinition.model.js";

export const bulkPublish = async (req, res) => {
  try {
    const { ids } = req.body;

    await QueryDefinition.updateMany(
      {
        _id: { $in: ids },
      },
      {
        status: "PUBLISHED",
      },
    );

    res.status(200).json({
      success: true,
      message: "Queries published successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bulkArchive = async (
  req,
  res
) => {
  try {
    const { ids } = req.body;

    await QueryDefinition.updateMany(
      {
        _id: { $in: ids },
      },
      {
        status: "ARCHIVED",
      }
    );

    res.status(200).json({
      success: true,
      message: "Queries archived",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bulkDelete = async (
  req,
  res
) => {
  try {
    const { ids } = req.body;

    await QueryDefinition.updateMany(
      {
        _id: { $in: ids },
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: req.user._id,
      }
    );

    res.status(200).json({
      success: true,
      message: "Queries deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};