export default function StatusBadge({ status }) {
  const styles = {
    ACTIVE: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",

    INACTIVE: "bg-red-500/10 text-red-500 border-red-500/20",

    DRAFT: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",

    PUBLISHED: "bg-blue-500/10 text-blue-500 border-blue-500/20",

    ARCHIVED: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };

  return (
    <span
      className={`
      px-3 py-1
      rounded-full
      border
      text-xs
      font-medium
      ${styles[status]}
    `}
    >
      {status}
    </span>
  );
}
