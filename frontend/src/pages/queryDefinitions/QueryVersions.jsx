import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";

import { useQuery, useMutation } from "@tanstack/react-query";

import {
  getVersions,
  rollbackVersion,
} from "../../services/queryVersionService";

export default function QueryVersions() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["versions", id],
    queryFn: () => getVersions(id),
  });

  const rollbackMutation = useMutation({
    mutationFn: rollbackVersion,
  });

  const versions = data?.data || [];

  const columns = [
    {
      key: "versionNumber",
      label: "Version",
    },

    {
      key: "changedAt",
      label: "Changed At",

      render: (row) => new Date(row.changedAt).toLocaleString(),
    },

    {
      key: "actions",
      label: "Actions",

      render: (row) => (
        <Button
          onClick={async () => {
            await rollbackMutation.mutateAsync({
              id,
              versionNumber: row.versionNumber,
            });

            toast.success("Rollback Successful");
          }}
        >
          Rollback
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Version History"
        subtitle="Rollback Previous Versions"
      />

      <DataTable columns={columns} data={versions} />
    </DashboardLayout>
  );
}
