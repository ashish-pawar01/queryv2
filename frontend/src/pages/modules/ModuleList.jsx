import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import ConfirmModal from "../../components/ui/ConfirmModal";

import ModuleModal from "./ModuleModal";

import {
  useModules,
  useCreateModule,
  useUpdateModule,
  useDeleteModule,
  useToggleModuleStatus,
} from "../../hooks/useModules";

import toast from "react-hot-toast";

export default function ModuleList() {
  const [search, setSearch] = useState("");

  const [page] = useState(1);

  const [limit] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedModule, setSelectedModule] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data, isLoading } = useModules({
    page,
    limit,
    search,
  });

  const createMutation = useCreateModule();

  const updateMutation = useUpdateModule();

  const deleteMutation = useDeleteModule();

  const toggleMutation = useToggleModuleStatus();

  const modules = data?.data || [];

  const columns = [
    {
      key: "name",
      label: "Name",
    },

    {
      key: "code",
      label: "Code",
    },

    {
      key: "category",
      label: "Category",

      render: (row) => row.category?.name,
    },

    {
      key: "status",
      label: "Status",

      render: (row) => <StatusBadge status={row.status} />,
    },

    {
      key: "actions",
      label: "Actions",

      render: (row) => (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setSelectedModule(row)}>
            Edit
          </Button>

          <Button onClick={() => toggleMutation.mutate(row._id)}>Toggle</Button>

          <Button
            variant="danger"
            onClick={() => {
              setSelectedModule(row);

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
        title="Modules"
        subtitle="Manage Modules"
        action={
          <Button onClick={() => setModalOpen(true)}>Create Module</Button>
        }
      />

      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Modules..."
        />
      </div>

      <DataTable columns={columns} data={modules} loading={isLoading} />

      <ModuleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={async (values) => {
          try {
            await createMutation.mutateAsync(values);

            toast.success("Module Created");

            setModalOpen(false);
          } catch (error) {
            toast.error(error?.response?.data?.message);
          }
        }}
        loading={createMutation.isPending}
      />

      <ModuleModal
        open={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        initialData={selectedModule}
        onSubmit={async (values) => {
          try {
            await updateMutation.mutateAsync({
              id: selectedModule._id,
              payload: values,
            });

            toast.success("Module Updated");

            setSelectedModule(null);
          } catch (error) {
            toast.error(error?.response?.data?.message);
          }
        }}
        loading={updateMutation.isPending}
      />

      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Module"
        message="Are you sure you want to delete this module?"
        onConfirm={async () => {
          await deleteMutation.mutateAsync(selectedModule._id);

          toast.success("Module Deleted");

          setDeleteOpen(false);
        }}
      />
    </DashboardLayout>
  );
}
