import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";

import seedPermissions from "./seedPermissions.js";
import seedRoles from "./seedRoles.js";
import seedSuperAdmin from "./seedSuperAdmin.js";

const seed = async () => {
  try {
    await connectDB();

    await seedPermissions();

    await seedRoles();

    await seedSuperAdmin();

    console.log("Database Seed Completed");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seed();
