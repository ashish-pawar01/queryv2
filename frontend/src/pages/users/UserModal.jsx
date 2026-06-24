import { useForm } from "react-hook-form";

import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

import { useRoles } from "../../hooks/useRoles";

export default function UserModal({ open, onClose, onSubmit, defaultValues }) {
  const { data: rolesData } = useRoles();

  const roles = rolesData?.data || [];

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="First Name" {...register("firstName")} />

        <Input label="Last Name" {...register("lastName")} />

        <Input label="Email" type="email" {...register("email")} />

        {!defaultValues && (
          <Input label="Password" type="password" {...register("password")} />
        )}

        <Select
          label="Role"
          {...register("roleId")}
          options={roles.map((role) => ({
            _id: role._id,
            name: role.name,
          }))}
        />

        <Button type="submit" className="w-full">
          Save User
        </Button>
      </form>
    </Modal>
  );
}
