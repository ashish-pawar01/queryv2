import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import ConfirmModal from "../../components/ui/ConfirmModal";

import CategoryModal from "./CategoryModal";

import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useToggleCategoryStatus,
} from "../../hooks/useCategories";

import toast from "react-hot-toast";

export default function CategoryList() {
  const [page] = useState(1);

  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useCategories({
    page,
    limit,
    search,
  });

  const createMutation = useCreateCategory();

  const updateMutation = useUpdateCategory();

  const deleteMutation = useDeleteCategory();

  const toggleMutation = useToggleCategoryStatus();

  const handleCreate = async (formData) => {
    try {
      await createMutation.mutateAsync(formData);

      toast.success("Category Created");

      setModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateMutation.mutateAsync({
        id: selectedCategory._id,
        payload: formData,
      });

      toast.success("Category Updated");

      setSelectedCategory(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    }
  };

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
      key: "status",
      label: "Status",

      render: (row) => <StatusBadge status={row.status} />,
    },

    {
      key: "actions",
      label: "Actions",

      render: (row) => (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setSelectedCategory(row)}>
            Edit
          </Button>

          <Button onClick={() => toggleMutation.mutate(row._id)}>Toggle</Button>

          <Button
            variant="danger"
            onClick={() => {
              setSelectedCategory(row);

              setDeleteModal(true);
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
        title="Categories"
        subtitle="Manage Categories"
        action={
          <Button onClick={() => setModalOpen(true)}>Create Category</Button>
        }
      />

      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Categories..."
        />
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        loading={createMutation.isPending}
      />

      <CategoryModal
        open={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        initialData={selectedCategory}
        onSubmit={handleUpdate}
        loading={updateMutation.isPending}
      />

      <ConfirmModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Category"
        message="Are you sure?"
        onConfirm={async () => {
          await deleteMutation.mutateAsync(selectedCategory._id);

          toast.success("Category Deleted");

          setDeleteModal(false);
        }}
      />
    </DashboardLayout>
  );
}
