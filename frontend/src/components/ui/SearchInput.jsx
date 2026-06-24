import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-gray-400
        "
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
        w-full
        pl-10
        pr-4
        py-3
        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        "
      />
    </div>
  );
}
