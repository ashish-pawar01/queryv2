const permissions = [
  // Category
  {
    name: "category.create",
    module: "CATEGORY",
    description: "Create Category",
  },
  {
    name: "category.view",
    module: "CATEGORY",
    description: "View Category",
  },
  {
    name: "category.edit",
    module: "CATEGORY",
    description: "Edit Category",
  },
  {
    name: "category.delete",
    module: "CATEGORY",
    description: "Delete Category",
  },

  // Module
  {
    name: "module.create",
    module: "MODULE",
    description: "Create Module",
  },
  {
    name: "module.view",
    module: "MODULE",
    description: "View Module",
  },
  {
    name: "module.edit",
    module: "MODULE",
    description: "Edit Module",
  },
  {
    name: "module.delete",
    module: "MODULE",
    description: "Delete Module",
  },

  // Query
  {
    name: "query.create",
    module: "QUERY",
    description: "Create Query",
  },
  {
    name: "query.view",
    module: "QUERY",
    description: "View Query",
  },
  {
    name: "query.edit",
    module: "QUERY",
    description: "Edit Query",
  },
  {
    name: "query.publish",
    module: "QUERY",
    description: "Publish Query",
  },
  {
    name: "query.archive",
    module: "QUERY",
    description: "Archive Query",
  },
  {
    name: "query.rollback",
    module: "QUERY",
    description: "Rollback Query",
  },
  {
    name: "query.generate",
    module: "QUERY",
    description: "Generate SQL",
  },

  // User
  {
    name: "user.create",
    module: "USER",
    description: "Create User",
  },
  {
    name: "user.view",
    module: "USER",
    description: "View User",
  },
  {
    name: "user.edit",
    module: "USER",
    description: "Edit User",
  },
  {
    name: "user.delete",
    module: "USER",
    description: "Delete User",
  },
  {
    name: "user.assign-role",
    module: "USER",
    description: "Assign Role",
  },

  // Role
  {
    name: "role.create",
    module: "ROLE",
    description: "Create Role",
  },
  {
    name: "role.view",
    module: "ROLE",
    description: "View Role",
  },
  {
    name: "role.edit",
    module: "ROLE",
    description: "Edit Role",
  },
  {
    name: "role.delete",
    module: "ROLE",
    description: "Delete Role",
  },

  // History
  {
    name: "history.view",
    module: "HISTORY",
    description: "View History",
  },
  {
    name: "history.export",
    module: "HISTORY",
    description: "Export History",
  },

  // Audit
  {
    name: "audit.view",
    module: "AUDIT",
    description: "View Audit",
  },
  {
    name: "audit.export",
    module: "AUDIT",
    description: "Export Audit",
  },

  // Settings
  {
    name: "settings.view",
    module: "SETTINGS",
    description: "View Settings",
  },
  {
    name: "settings.edit",
    module: "SETTINGS",
    description: "Edit Settings",
  },
];

export default permissions;
