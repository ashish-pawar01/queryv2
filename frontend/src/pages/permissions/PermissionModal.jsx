import { useForm } from "react-hook-form";

import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function PermissionModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Permission</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Permission Name" {...register("name")} />

          <Select
            label="Module"
            {...register("module")}
            options={[
              { _id: "CATEGORY", name: "CATEGORY" },
              { _id: "MODULE", name: "MODULE" },
              { _id: "QUERY", name: "QUERY" },
              { _id: "USER", name: "USER" },
              { _id: "ROLE", name: "ROLE" },
              { _id: "HISTORY", name: "HISTORY" },
              { _id: "AUDIT", name: "AUDIT" },
              { _id: "SETTINGS", name: "SETTINGS" },
            ]}
          />

          <Input label="Description" {...register("description")} />

          <Button type="submit" className="w-full">
            Save Permission
          </Button>
        </form>
      </div>
    </Modal>
  );
}
