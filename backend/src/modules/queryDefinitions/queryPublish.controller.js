import QueryDefinition from "./queryDefinition.model.js";

export const publishQuery = async (req, res) => {
  try {
    const query = await QueryDefinition.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
      });
    }

    query.status = "PUBLISHED";

    await query.save();

    res.json({
      success: true,
      message: "Published Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const archiveQuery = async (req, res) => {
  try {
    const query = await QueryDefinition.findById(req.params.id);

    query.status = "ARCHIVED";

    await query.save();

    res.json({
      success: true,
      message: "Archived Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
