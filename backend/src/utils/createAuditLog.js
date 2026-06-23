import AuditLog from "../modules/audit/auditLog.model.js";

const createAuditLog = async ({
  user,
  action,
  entityType,
  entityId,
  description,
}) => {
  try {
    await AuditLog.create({
      user,
      action,
      entityType,
      entityId,
      description,
    });
  } catch (error) {
    console.error("Audit Log Error:", error.message);
  }
};

export default createAuditLog;