import { Menu, X } from "lucide-react";

import { useState } from "react";

export default function MobileSidebar({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Menu />
      </button>

      {open && (
        <div
          className="
          fixed inset-0
          z-50
          bg-black/50
          "
        >
          <div
            className="
            w-72
            h-full
            bg-[var(--card)]
            "
          >
            <button onClick={() => setOpen(false)}>
              <X />
            </button>

            {children}
          </div>
        </div>
      )}
    </>
  );
}
