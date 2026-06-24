import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ConditionCard({
  condition,
  index,
  updateCondition,
  removeCondition,
}) {
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
        value={condition.label}
        onChange={(e) => updateCondition(index, "label", e.target.value)}
      />

      <Input
        label="Field Key"
        value={condition.fieldKey}
        onChange={(e) => updateCondition(index, "fieldKey", e.target.value)}
      />

      <Input
        label="DB Column"
        value={condition.dbColumn}
        onChange={(e) => updateCondition(index, "dbColumn", e.target.value)}
      />

      <Button variant="danger" onClick={() => removeCondition(index)}>
        Remove
      </Button>
    </div>
  );
}
