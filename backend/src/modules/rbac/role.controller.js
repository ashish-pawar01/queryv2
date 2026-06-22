import Role from "./role.model.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");

    res.json({
      success: true,
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
