import { Sun, Moon, Monitor } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="
      flex
      items-center
      gap-2
      "
    >
      <button onClick={() => setTheme("light")}>
        <Sun size={18} />
      </button>

      <button onClick={() => setTheme("dark")}>
        <Moon size={18} />
      </button>

      <button onClick={() => setTheme("midnight")}>
        <Monitor size={18} />
      </button>
    </div>
  );
}
