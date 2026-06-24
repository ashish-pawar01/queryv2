import { useState } from "react";
import { useForm } from "react-hook-form";

import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import PermissionMatrix from "../../components/roles/PermissionMatrix";

import { usePermissions } from "../../hooks/usePermissions";

export default function RoleModal({ open, onClose, onSubmit, defaultValues }) {
  const { data } = usePermissions();

  const permissions = data?.data || [];

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const [selectedPermissions, setSelectedPermissions] = useState(
    defaultValues?.permissions?.map(
      (permission) => permission._id || permission,
    ) || [],
  );

  if (!open) return null;

  const submitHandler = (values) => {
    onSubmit({
      ...values,
      permissions: selectedPermissions,
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Role Management</h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          <Input label="Role Name" {...register("name")} />

          <PermissionMatrix
            permissions={permissions}
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />

          <Button type="submit" className="w-full">
            Save Role
          </Button>
        </form>
      </div>
    </Modal>
  );
}
