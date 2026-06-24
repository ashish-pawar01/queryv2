import { Command, CommandInput, CommandList, CommandItem } from "cmdk";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const routes = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Modules",
    path: "/modules",
  },
  {
    name: "Query Definitions",
    path: "/query-definitions",
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();

        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      z-50
      flex
      justify-center
      pt-32
      "
    >
      <Command
        className="
        w-full
        max-w-xl
        bg-[var(--card)]
        rounded-2xl
        border
        border-[var(--border)]
        "
      >
        <CommandInput placeholder="Search..." />

        <CommandList>
          {routes.map((route) => (
            <CommandItem
              key={route.path}
              onSelect={() => {
                navigate(route.path);

                setOpen(false);
              }}
            >
              {route.name}
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
