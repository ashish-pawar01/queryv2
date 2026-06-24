import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import ConfirmModal from "../../components/ui/ConfirmModal";

import RoleModal from "./RoleModal";

import {
  useRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
} from "../../hooks/useRoles";

export default function RoleList() {
  const { data, isLoading } = useRoles();

  const createMutation = useCreateRole();

  const updateMutation = useUpdateRole();

  const deleteMutation = useDeleteRole();

  const [open, setOpen] = useState(false);

  const [editingRole, setEditingRole] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const roles = data?.data || [];

  const columns = [
    {
      key: "name",
      label: "Role Name",
    },

    {
      key: "permissions",
      label: "Permissions",

      render: (row) => row.permissions?.length || 0,
    },

    {
      key: "actions",
      label: "Actions",

      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setEditingRole(row);
              setOpen(true);
            }}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              setEditingRole(row);
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
        title="Roles"
        subtitle="Manage roles"
        action={
          <Button
            onClick={() => {
              setEditingRole(null);
              setOpen(true);
            }}
          >
            Create Role
          </Button>
        }
      />

      <DataTable columns={columns} data={roles} loading={isLoading} />

      <RoleModal
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={editingRole}
        onSubmit={async (values) => {
          if (editingRole) {
            await updateMutation.mutateAsync({
              id: editingRole._id,
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
        title="Delete Role"
        message="Are you sure?"
        onConfirm={async () => {
          await deleteMutation.mutateAsync(editingRole._id);

          setDeleteOpen(false);
        }}
      />
    </DashboardLayout>
  );
}
