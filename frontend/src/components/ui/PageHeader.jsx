export default function PageHeader({ title, subtitle, action }) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      mb-6
      "
    >
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="opacity-60 mt-1">{subtitle}</p>
      </div>

      {action}
    </div>
  );
}
