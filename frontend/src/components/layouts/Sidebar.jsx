import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Users } from "lucide-react";

import {
  LayoutDashboard,
  FolderTree,
  Boxes,
  Database,
  ChevronLeft,
  ChevronRight,
  History,
  ClipboardList,
  Settings,
  KeyRound
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Categories",
    icon: FolderTree,
    path: "/categories",
  },
  {
    name: "Modules",
    icon: Boxes,
    path: "/modules",
  },
  {
    name: "Query Definitions",
    icon: Database,
    path: "/query-definitions",
  },
  {
    name: "Roles",
    icon: Shield,
    path: "/roles",
  },
  {
    name: "Users",
    icon: Users,
    path: "/users",
  },
  {
    name: "History",
    icon: History,
    path: "/history",
  },
  {
    name: "Audit Logs",
    icon: ClipboardList,
    path: "/audit",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    name: "Permissions",
    icon: KeyRound,
    path: "/permissions",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{
        width: collapsed ? 90 : 260,
      }}
      className="
      min-h-screen
      border-r
      border-[var(--border)]
      bg-[var(--card)]
      "
    >
      <div
        className="
        h-20
        px-5
        flex
        items-center
        justify-between
        "
      >
        {!collapsed && <h2 className="font-bold text-xl">Query Master</h2>}

        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <nav className="px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all

                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-[var(--card-hover)]"
                  }
                `
              }
            >
              <Icon size={20} />

              {!collapsed && item.name}
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
}
