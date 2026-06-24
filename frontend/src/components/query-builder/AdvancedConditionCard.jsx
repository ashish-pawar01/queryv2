import Card from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const OPERATORS = ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN", "BETWEEN"];

export default function AdvancedConditionCard({
  condition,
  index,
  updateCondition,
  removeCondition,
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Condition #{index + 1}</h3>

        <Button variant="danger" onClick={() => removeCondition(index)}>
          Remove
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
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

        <Select
          label="Operator"
          value={condition.operator}
          onChange={(e) => updateCondition(index, "operator", e.target.value)}
          options={OPERATORS.map((op) => ({
            _id: op,
            name: op,
          }))}
        />
      </div>

      <label className="flex gap-3 items-center">
        <input
          type="checkbox"
          checked={condition.required}
          onChange={(e) => updateCondition(index, "required", e.target.checked)}
        />
        Required
      </label>
    </Card>
  );
}
