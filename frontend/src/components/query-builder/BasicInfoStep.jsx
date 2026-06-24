import Input from "../ui/Input";
import Select from "../ui/Select";

import {
  useCategoryDropdown,
  useModuleDropdown,
} from "../../hooks/useDropdowns";

export default function BasicInfoStep({ register }) {
  const { data: categories = [] } = useCategoryDropdown();

  const { data: modules = [] } = useModuleDropdown();

  return (
    <div className="space-y-4">
      <Select label="Category" options={categories} {...register("category")} />

      <Select label="Module" options={modules} {...register("module")} />

      <Input label="Query Name" {...register("name")} />

      <Input label="Description" {...register("description")} />

      <Input label="Target Table" {...register("targetTable")} />

      <Select
        label="Query Type"
        options={[
          {
            _id: "MANUAL",
            name: "MANUAL",
          },

          {
            _id: "AUTO_INSERT",
            name: "AUTO_INSERT",
          },

          {
            _id: "AUTO_UPDATE",
            name: "AUTO_UPDATE",
          },

          {
            _id: "AUTO_DELETE",
            name: "AUTO_DELETE",
          },

          {
            _id: "HYBRID",
            name: "HYBRID",
          },
        ]}
        {...register("queryType")}
      />
    </div>
  );
}
