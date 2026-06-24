import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import { exportToExcel } from "../../utils/exportToExcel";

export default function AuditLogList() {
  const columns = [
    {
      key: "action",
      label: "Action",
    },
    {
      key: "user",
      label: "User",
    },
    {
      key: "entity",
      label: "Entity",
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader title="Audit Logs" subtitle="System Activity" />

      <DataTable columns={columns} data={[]} />
      <Button onClick={() => exportToExcel(auditLogs, "audit-logs")}>
        Export Excel
      </Button>
    </DashboardLayout>
  );
}
