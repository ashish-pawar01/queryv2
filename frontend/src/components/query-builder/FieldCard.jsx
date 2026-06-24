import Input from "../ui/Input";
import Button from "../ui/Button";

export default function FieldCard({ field, index, updateField, removeField }) {
  return (
    <div
      className="
      border
      border-[var(--border)]
      rounded-2xl
      p-4
      space-y-3
      "
    >
      <Input
        label="Label"
        value={field.label}
        onChange={(e) => updateField(index, "label", e.target.value)}
      />

      <Input
        label="Field Key"
        value={field.fieldKey}
        onChange={(e) => updateField(index, "fieldKey", e.target.value)}
      />

      <Input
        label="DB Column"
        value={field.dbColumn}
        onChange={(e) => updateField(index, "dbColumn", e.target.value)}
      />

      <Button variant="danger" onClick={() => removeField(index)}>
        Remove
      </Button>
    </div>
  );
}
