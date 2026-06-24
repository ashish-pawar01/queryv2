import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Eye,
  Pencil,
  Copy,
  Trash2,
  History,
  Archive,
  Upload,
  CopyPlus,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import ConfirmModal from "../../components/ui/ConfirmModal";

import VersionHistoryModal from "../../components/query-builder/VersionHistoryModal";

import {
  useQueries,
  useDeleteQuery,
  useCloneQuery,
  usePublishQuery,
  useArchiveQuery,
} from "../../hooks/useQueries";

export default function QueryList() {
  const navigate = useNavigate();

  const { data, isLoading } = useQueries();

  const deleteMutation = useDeleteQuery();

  const cloneMutation = useCloneQuery();

  const publishMutation = usePublishQuery();

  const archiveMutation = useArchiveQuery();

  const [selectedQuery, setSelectedQuery] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [versionOpen, setVersionOpen] = useState(false);

  const queries = data?.data || [];

  const columns = [
    {
      key: "name",
      label: "Name",
    },

    {
      key: "category",
      label: "Category",

      render: (row) => row.category?.name || "-",
    },

    {
      key: "module",
      label: "Module",

      render: (row) => row.module?.name || "-",
    },

    {
      key: "queryType",
      label: "Type",
    },

    {
      key: "status",
      label: "Status",

      render: (row) => <StatusBadge status={row.status} />,
    },

    {
      key: "version",
      label: "Version",

      render: (row) => row.currentVersion,
    },

    {
      key: "actions",
      label: "Actions",

      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate(`/query-definitions/${row._id}/edit`)}
          >
            <Pencil size={15} />
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate(`/query-definitions/${row._id}/preview`)}
          >
            Preview
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(`/query-definitions/${row._id}/versions`)}
          >
            Versions
          </Button>
          <Button
            variant="secondary"
            onClick={async () => {
              await cloneMutation.mutateAsync(row._id);

              toast.success("Query Cloned");
            }}
          >
            Clone
          </Button>
          <Button onClick={() => publishMutation.mutate(row._id)}>
            Publish
          </Button>
          <Button
            variant="secondary"
            onClick={() => archiveMutation.mutate(row._id)}
          >
            Archive
          </Button>

          <Button
            onClick={async () => {
              try {
                await cloneMutation.mutateAsync(row._id);

                toast.success("Query Cloned");
              } catch {
                toast.error("Clone Failed");
              }
            }}
          >
            <CopyPlus size={15} />
          </Button>

          <Button
            onClick={async () => {
              try {
                await publishMutation.mutateAsync(row._id);

                toast.success("Query Published");
              } catch {
                toast.error("Publish Failed");
              }
            }}
          >
            <Upload size={15} />
          </Button>

          <Button
            onClick={async () => {
              try {
                await archiveMutation.mutateAsync(row._id);

                toast.success("Query Archived");
              } catch {
                toast.error("Archive Failed");
              }
            }}
          >
            <Archive size={15} />
          </Button>

          <Button
            onClick={() => {
              setSelectedQuery(row);

              setVersionOpen(true);
            }}
          >
            <History size={15} />
          </Button>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(row._id);

              toast.success("Query ID Copied");
            }}
          >
            <Copy size={15} />
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              setSelectedQuery(row);

              setDeleteOpen(true);
            }}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Query Definitions"
        subtitle="Manage Query Definitions"
        action={
          <Button onClick={() => navigate("/query-definitions/create")}>
            Create Query
          </Button>
        }
      />

      <DataTable columns={columns} data={queries} loading={isLoading} />

      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Query"
        message="Are you sure you want to delete this query?"
        onConfirm={async () => {
          try {
            await deleteMutation.mutateAsync(selectedQuery._id);

            toast.success("Query Deleted");

            setDeleteOpen(false);
          } catch {
            toast.error("Delete Failed");
          }
        }}
      />

      <VersionHistoryModal
        open={versionOpen}
        onClose={() => setVersionOpen(false)}
        queryId={selectedQuery?._id}
      />
    </DashboardLayout>
  );
}
