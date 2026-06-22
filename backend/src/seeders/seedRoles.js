import Role from "../modules/rbac/role.model.js";
import Permission from "../modules/rbac/permission.model.js";

const seedRoles = async () => {
  try {
    const permissions = await Permission.find();

    const allPermissionIds = permissions.map((permission) => permission._id);

    const superAdminExists = await Role.findOne({
      name: "SUPER_ADMIN",
    });

    if (!superAdminExists) {
      await Role.create({
        name: "SUPER_ADMIN",
        permissions: allPermissionIds,
      });
    }

    const adminExists = await Role.findOne({
      name: "ADMIN",
    });

    if (!adminExists) {
      await Role.create({
        name: "ADMIN",
        permissions: allPermissionIds,
      });
    }

    const userExists = await Role.findOne({
      name: "USER",
    });

    if (!userExists) {
      const queryGenerate = await Permission.findOne({
        name: "query.generate",
      });

      const historyView = await Permission.findOne({
        name: "history.view",
      });

      await Role.create({
        name: "USER",
        permissions: [queryGenerate._id, historyView._id],
      });
    }

    console.log("Roles Seeded");
  } catch (error) {
    console.error(error);
  }
};

export default seedRoles;
