import { Inbox } from "lucide-react";

export default function EmptyState({ title, description }) {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      py-20
      "
    >
      <Inbox size={50} className="opacity-40" />

      <h3 className="mt-4 text-xl font-semibold">{title}</h3>

      <p className="opacity-60 mt-2">{description}</p>
    </div>
  );
}
