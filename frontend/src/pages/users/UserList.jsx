import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import ConfirmModal from "../../components/ui/ConfirmModal";
import StatusBadge from "../../components/ui/StatusBadge";

import UserModal from "./UserModal";

import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useToggleUserStatus,
} from "../../hooks/useUsers";

export default function UserList() {
  const { data, isLoading } = useUsers();

  const createMutation = useCreateUser();

  const updateMutation = useUpdateUser();

  const deleteMutation = useDeleteUser();

  const toggleMutation = useToggleUserStatus();

  const [open, setOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const users = data?.data || [];

  const columns = [
    {
      key: "firstName",
      label: "First Name",
    },
    {
      key: "lastName",
      label: "Last Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (row) => row.role?.name,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge status={row.isActive ? "ACTIVE" : "INACTIVE"} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setEditingUser(row);
              setOpen(true);
            }}
          >
            Edit
          </Button>

          <Button onClick={() => toggleMutation.mutate(row._id)}>Toggle</Button>

          <Button
            variant="danger"
            onClick={() => {
              setEditingUser(row);
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
        title="Users"
        subtitle="Manage Users"
        action={
          <Button
            onClick={() => {
              setEditingUser(null);
              setOpen(true);
            }}
          >
            Create User
          </Button>
        }
      />

      <DataTable columns={columns} data={users} loading={isLoading} />

      <UserModal
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={editingUser}
        onSubmit={async (values) => {
          if (editingUser) {
            await updateMutation.mutateAsync({
              id: editingUser._id,
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
        title="Delete User"
        message="Are you sure?"
        onConfirm={async () => {
          await deleteMutation.mutateAsync(editingUser._id);

          setDeleteOpen(false);
        }}
      />
    </DashboardLayout>
  );
}
