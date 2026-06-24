import DashboardLayout from "../../layouts/DashboardLayout";
import QueryWizard from "../../components/query-builder/QueryWizard";

import { useCreateQuery } from "../../hooks/useQueries";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateQuery() {
  const navigate = useNavigate();

  const createMutation = useCreateQuery();

  const handleCreate = async (payload) => {
    try {
      await createMutation.mutateAsync(payload);

      toast.success("Query Created Successfully");

      navigate("/query-definitions");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create query");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Create Query Definition</h1>

        <QueryWizard
          onSubmit={handleCreate}
          loading={createMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
}
