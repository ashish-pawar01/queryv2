import EmptyState from "./EmptyState";

export default function DataTable({ columns, data, loading }) {
  if (!loading && !data?.length) {
    return (
      <EmptyState
        title="No Records Found"
        description="Try adjusting filters"
      />
    );
  }

  return (
    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-[var(--border)]
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr
              className="
            bg-[var(--card)]
            border-b
            border-[var(--border)]
            "
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="
                px-5
                py-4
                text-left
                "
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.map((row, index) => (
              <tr
                key={index}
                className="
              border-b
              border-[var(--border)]
              hover:bg-[var(--card-hover)]
              "
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="
                  px-5
                  py-4
                  "
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
