export const checkQueryAccess =
(
  user,
  queryDefinition
) => {

  const denied =
    queryDefinition.accessControl.deniedUsers.some(
      (id) =>
        id.toString() ===
        user._id.toString()
    );

  if (denied) {
    return false;
  }

  const allowedUser =
    queryDefinition.accessControl.allowedUsers.some(
      (id) =>
        id.toString() ===
        user._id.toString()
    );

  if (allowedUser) {
    return true;
  }

  const allowedRole =
    queryDefinition.accessControl.allowedRoles.some(
      (id) =>
        id.toString() ===
        user.role._id.toString()
    );

  return allowedRole;
};