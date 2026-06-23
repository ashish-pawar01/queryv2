import {
  LayoutDashboard,
  FolderKanban,
  Database,
  PlayCircle,
  ChevronLeft,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Modules",
    path: "/modules",
    icon: FolderKanban,
  },
  {
    name: "Queries",
    path: "/queries",
    icon: Database,
  },
  {
    name: "Run Queries",
    path: "/run-queries",
    icon: PlayCircle,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <motion.aside
      animate={{
        width: collapsed
          ? 90
          : 260,
      }}
      className="
      h-screen
      sticky
      top-0
      border-r
      border-[var(--border)]
      bg-[var(--card)]
      "
    >
      <div className="p-4">
        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >
          <ChevronLeft />
        </button>
      </div>

      <nav className="px-3 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              p-3
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
            <item.icon size={20} />

            {!collapsed &&
              item.name}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}