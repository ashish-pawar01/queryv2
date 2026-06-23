import AuditLog from "./audit.model.js";

export const getAuditLogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const filter = {};

    if (req.query.user) {
      filter.user = req.query.user;
    }

    if (req.query.action) {
      filter.action = req.query.action;
    }

    if (req.query.module) {
      filter.module = req.query.module;
    }

    const logs = await AuditLog.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await AuditLog.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAuditLogById = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Audit log not found",
      });
    }

    res.status(200).json({
      success: true,
      data: log,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({
      user: req.params.userId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
