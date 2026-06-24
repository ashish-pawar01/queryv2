import { useForm } from "react-hook-form";
import { useEffect } from "react";

import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";

import { useCategoryDropdown } from "../../hooks/useDropdowns";

export default function ModuleModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const { register, handleSubmit, reset } = useForm();

  const { data: categories = [] } = useCategoryDropdown();

  useEffect(() => {
    if (initialData) {
      reset({
        category: initialData.category?._id,
        name: initialData.name,
        code: initialData.code,
        description: initialData.description,
      });
    } else {
      reset({
        category: "",
        name: "",
        code: "",
        description: "",
      });
    }
  }, [initialData, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? "Edit Module" : "Create Module"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Category"
          options={categories}
          {...register("category")}
        />

        <Input label="Module Name" {...register("name")} />

        <Input label="Module Code" {...register("code")} />

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
