import User from "../modules/users/user.model.js";
import Role from "../modules/rbac/role.model.js";

const seedSuperAdmin = async () => {
  try {
    const role = await Role.findOne({
      name: "SUPER_ADMIN",
    });

    if (!role) {
      throw new Error("SUPER_ADMIN role not found");
    }

    const exists = await User.findOne({
      email: "admin@querymaster.com",
    });

    if (exists) {
      console.log("Super Admin already exists");

      return;
    }

    await User.create({
      firstName: "Super",
      lastName: "Admin",

      email: "admin@querymaster.com",

      password: "Admin@123",

      role: role._id,
    });

    console.log("Super Admin Created");
  } catch (error) {
    console.error(error);
  }
};

export default seedSuperAdmin;
