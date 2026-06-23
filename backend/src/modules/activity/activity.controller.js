import AuditLog from "../audit/audit.model.js";

export const getActivityFeed = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;

    const activities = await AuditLog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
