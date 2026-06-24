import ThemeSwitcher from "../ui/ThemeSwitcher";
import { Bell } from "lucide-react";
import Breadcrumb from "./Breadcrumb";

export default function Navbar() {
  return (
    <header
      className="
      sticky
      top-0
      z-50
      border-b
      border-[var(--border)]
      bg-[var(--bg)]
      px-6 py-4
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb />
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Bell size={20} />
        </div>
      </div>
    </header>
  );
}
