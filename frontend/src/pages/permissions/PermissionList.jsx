import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import ConfirmModal from "../../components/ui/ConfirmModal";

import PermissionModal from "./PermissionModal";

import {
  usePermissions,
  useCreatePermission,
  useUpdatePermission,
  useDeletePermission,
} from "../../hooks/usePermissions";

export default function PermissionList() {
  const { data, isLoading } = usePermissions();

  const createMutation = useCreatePermission();

  const updateMutation = useUpdatePermission();

  const deleteMutation = useDeletePermission();

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const permissions = data?.data || [];

  const columns = [
    {
      key: "name",
      label: "Permission",
    },
    {
      key: "module",
      label: "Module",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setEditing(row);
              setOpen(true);
            }}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              setEditing(row);
              setDeleteOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Permissions"
        subtitle="Manage System Permissions"
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Create Permission
          </Button>
        }
      />

      <DataTable columns={columns} data={permissions} loading={isLoading} />

      <PermissionModal
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={editing}
        onSubmit={async (values) => {
          if (editing) {
            await updateMutation.mutateAsync({
              id: editing._id,
              payload: values,
            });
          } else {
            await createMutation.mutateAsync(values);
          }

          setOpen(false);
        }}
      />

      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Permission"
        message="Are you sure?"
        onConfirm={async () => {
          await deleteMutation.mutateAsync(editing._id);

          setDeleteOpen(false);
        }}
      />
    </DashboardLayout>
  );
}
