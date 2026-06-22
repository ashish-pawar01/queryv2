import { createAuditLog } from "./audit.service.js";

export const audit = async (
  req,
  action,
  module,
  description,
  metadata = {},
) => {
  try {
    await createAuditLog({
      user: req.user?._id,
      action,
      module,
      description,
      metadata,
      ipAddress: req.ip,
    });
  } catch (error) {
    console.error("Audit Error:", error.message);
  }
};
