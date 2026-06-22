const authorize =
  (...permissions) =>
  (req, res, next) => {
    if (
      req.user.role.name ===
      "SUPER_ADMIN"
    ) {
      return next();
    }

    const userPermissions =
      req.user.role.permissions.map(
        (permission) =>
          permission.name
      );

    const allowed =
      permissions.some(
        (permission) =>
          userPermissions.includes(
            permission
          )
      );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message:
          "Permission denied"
      });
    }

    next();
  };

export default authorize;