import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import Loader from "../../components/ui/Loader";

import QueryWizard from "../../components/query-builder/QueryWizard";

import { useQueryById, useUpdateQuery } from "../../hooks/useQueries";

export default function EditQuery() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useQueryById(id);

  const updateMutation = useUpdateQuery();

  const query = data?.data || null;

  const handleUpdate = async (payload) => {
    try {
      await updateMutation.mutateAsync({
        id,
        payload,
      });

      toast.success("Query Updated Successfully");

      navigate("/query-definitions");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update Failed");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!query) {
    return (
      <DashboardLayout>
        <div>Query not found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Edit Query Definition</h1>

        <QueryWizard
          defaultValues={query}
          onSubmit={handleUpdate}
          loading={updateMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
}
