import Permission from "../modules/rbac/permission.model.js";
import permissions from "./permissions.js";

const seedPermissions = async () => {
  try {
    for (const permission of permissions) {
      const exists = await Permission.findOne({
        name: permission.name,
      });

      if (!exists) {
        await Permission.create(permission);
      }
    }

    console.log("Permissions Seeded");
  } catch (error) {
    console.error(error);
  }
};

export default seedPermissions;
