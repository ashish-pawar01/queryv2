import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";

export default function ReviewStep({ formData }) {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Query Information</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Name</p>
            <p>{formData.name}</p>
          </div>

          <div>
            <p className="font-medium">Query Type</p>
            <p>{formData.queryType}</p>
          </div>

          <div>
            <p className="font-medium">Target Table</p>
            <p>{formData.targetTable}</p>
          </div>

          <div>
            <p className="font-medium">Status</p>

            <StatusBadge status={formData.status || "DRAFT"} />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Fields</h3>

        <p>Total Fields: {formData.fields?.length || 0}</p>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Conditions</h3>

        <p>Total Conditions: {formData.conditions?.length || 0}</p>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Access Control</h3>

        <p>Roles: {formData.accessControl?.allowedRoles?.length || 0}</p>

        <p>Users: {formData.accessControl?.allowedUsers?.length || 0}</p>

        <p>Denied: {formData.accessControl?.deniedUsers?.length || 0}</p>
      </Card>
    </div>
  );
}
