import AuditLog from "../modules/audit/auditLog.model.js";

export const createAuditLog = async ({
  user,
  action,
  module,
  description = "",
  metadata = {},
  ipAddress = "",
}) => {
  try {
    await AuditLog.create({
      user,
      action,
      module,
      description,
      metadata,
      ipAddress,
    });
  } catch (error) {
    console.error("Audit Log Error:", error.message);
  }
};

export default createAuditLog;