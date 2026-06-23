import ThemeSwitcher from "../ui/ThemeSwitcher";

export default function Navbar() {
  return (
    <header
      className="
      sticky
      top-0
      z-40
      bg-[var(--bg)]
      border-b
      border-[var(--border)]
      px-6
      py-4
      flex
      justify-between
      items-center
      "
    >
      <h1 className="font-semibold text-lg">Query Master</h1>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
