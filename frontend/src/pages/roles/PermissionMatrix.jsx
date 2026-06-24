import Card from "../ui/Card";

export default function PermissionMatrix({
  permissions,
  selectedPermissions,
  setSelectedPermissions,
}) {
  const grouped = permissions.reduce((acc, permission) => {
    const module = permission.module || "OTHER";

    if (!acc[module]) {
      acc[module] = [];
    }

    acc[module].push(permission);

    return acc;
  }, {});

  const togglePermission = (id) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions(selectedPermissions.filter((item) => item !== id));
    } else {
      setSelectedPermissions([...selectedPermissions, id]);
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([module, perms]) => (
        <Card key={module}>
          <h3 className="text-lg font-semibold mb-4">{module}</h3>

          <div className="grid md:grid-cols-2 gap-3">
            {perms.map((permission) => (
              <label
                key={permission._id}
                className="
                      flex
                      items-center
                      gap-3
                      p-3
                      rounded-xl
                      border
                      border-[var(--border)]
                    "
              >
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission._id)}
                  onChange={() => togglePermission(permission._id)}
                />

                <div>
                  <p className="font-medium">{permission.name}</p>

                  <p className="text-sm opacity-60">{permission.description}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
