import QueryDefinition from "./queryDefinition.model.js";

export const assignRole = async (req, res) => {
  try {
    const { roleId } = req.body;

    const query = await QueryDefinition.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
      });
    }

    if (!query.accessControl.allowedRoles.includes(roleId)) {
      query.accessControl.allowedRoles.push(roleId);
    }

    await query.save();

    res.json({
      success: true,
      message: "Role assigned",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const query = await QueryDefinition.findById(req.params.id);

    if (!query.accessControl.allowedUsers.includes(userId)) {
      query.accessControl.allowedUsers.push(userId);
    }

    await query.save();

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const denyUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const query = await QueryDefinition.findById(req.params.id);

    if (!query.accessControl.deniedUsers.includes(userId)) {
      query.accessControl.deniedUsers.push(userId);
    }

    await query.save();

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeRole = async (req, res) => {
  try {
    const { roleId } = req.body;

    const query = await QueryDefinition.findById(req.params.id);

    query.accessControl.allowedRoles = query.accessControl.allowedRoles.filter(
      (id) => id.toString() !== roleId,
    );

    await query.save();

    res.json({
      success: true,
      message: "Role removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const query = await QueryDefinition.findById(req.params.id);

    query.accessControl.allowedUsers = query.accessControl.allowedUsers.filter(
      (id) => id.toString() !== userId,
    );

    await query.save();

    res.json({
      success: true,
      message: "User removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeDeniedUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const query = await QueryDefinition.findById(req.params.id);

    query.accessControl.deniedUsers = query.accessControl.deniedUsers.filter(
      (id) => id.toString() !== userId,
    );

    await query.save();

    res.json({
      success: true,
      message: "Denied user removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
