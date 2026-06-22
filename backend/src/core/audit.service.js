import AuditLog from "../modules/audit/audit.model.js";

export const createAuditLog =
  async ({
    user,
    action,
    module,
    description,
    metadata,
    ipAddress
  }) => {
    return AuditLog.create({
      user,
      action,
      module,
      description,
      metadata,
      ipAddress
    });
  };