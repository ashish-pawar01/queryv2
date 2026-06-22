import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";

import User from "../modules/users/user.model.js";
import Role from "../modules/rbac/role.model.js";
import Permission from "../modules/rbac/permission.model.js";

const reset = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});

    console.log("Database Reset Complete");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

reset();
