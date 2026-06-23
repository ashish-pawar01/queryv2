import Permission from "./permission.model.js";
import Role from "../roles/role.model.js";

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: permissions.length,
      data: permissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: permission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);

    res.status(201).json({
      success: true,
      data: permission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: permission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const roleUsingPermission = await Role.findOne({
      permissions: req.params.id,
    });

    if (roleUsingPermission) {
      return res.status(400).json({
        success: false,
        message: "Permission assigned to role",
      });
    }
    const permission = await Permission.findByIdAndDelete(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Permission deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
