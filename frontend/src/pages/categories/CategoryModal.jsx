import { useForm } from "react-hook-form";
import { useEffect } from "react";

import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function CategoryModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        code: "",
        description: "",
      });
    }
  }, [initialData, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? "Edit Category" : "Create Category"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Category Name" {...register("name")} />

        <Input label="Category Code" {...register("code")} />

        <Input label="Description" {...register("description")} />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">{loading ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
