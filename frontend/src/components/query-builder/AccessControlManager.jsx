import { useEffect, useState } from "react";

import Card from "../ui/Card";
import Select from "../ui/Select";
import Button from "../ui/Button";

import { getRoles } from "../../services/roleService";
import { getUsers } from "../../services/userService";

export default function AccessControlManager({ value, onChange }) {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const roleData = await getRoles();
    const userData = await getUsers();

    setRoles(roleData.data || []);
    setUsers(userData.data || []);
  };

  return (
    <Card className="space-y-6">
      <h3 className="text-xl font-semibold">Access Control</h3>

      <Select
        label="Allowed Roles"
        multiple
        value={value.allowedRoles}
        options={roles.map((role) => ({
          _id: role._id,
          name: role.name,
        }))}
        onChange={(e) =>
          onChange({
            ...value,
            allowedRoles: Array.from(
              e.target.selectedOptions,
              (option) => option.value,
            ),
          })
        }
      />

      <Select
        label="Allowed Users"
        multiple
        value={value.allowedUsers}
        options={users.map((user) => ({
          _id: user._id,
          name: `${user.firstName} ${user.lastName}`,
        }))}
        onChange={(e) =>
          onChange({
            ...value,
            allowedUsers: Array.from(
              e.target.selectedOptions,
              (option) => option.value,
            ),
          })
        }
      />

      <Select
        label="Denied Users"
        multiple
        value={value.deniedUsers}
        options={users.map((user) => ({
          _id: user._id,
          name: `${user.firstName} ${user.lastName}`,
        }))}
        onChange={(e) =>
          onChange({
            ...value,
            deniedUsers: Array.from(
              e.target.selectedOptions,
              (option) => option.value,
            ),
          })
        }
      />
    </Card>
  );
}
