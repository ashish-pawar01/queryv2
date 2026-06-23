import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="
      px-3
      py-2
      rounded-xl
      bg-[var(--card)]
      border
      border-[var(--border)]
      "
    >
      <option value="light">Light</option>

      <option value="dark">Dark</option>

      <option value="midnight">Midnight</option>
    </select>
  );
}
