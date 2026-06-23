import Role from "./role.model.js";
import User from "../users/user.model.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find()
      .populate("permissions")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);

    res.status(201).json({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const users = await User.countDocuments({
      role: req.params.id,
    });

    if (users > 0) {
      return res.status(400).json({
        success: false,
        message: "Role assigned to users",
      });
    }
    const role = await Role.findByIdAndDelete(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
