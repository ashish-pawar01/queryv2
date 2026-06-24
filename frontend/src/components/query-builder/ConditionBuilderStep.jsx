import Button from "../ui/Button";
import AdvancedConditionCard from "./AdvancedConditionCard";

export default function ConditionBuilderStep({ conditions, setConditions }) {
  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        label: "",
        fieldKey: "",
        dbColumn: "",
        operator: "=",
        required: false,
      },
    ]);
  };

  const updateCondition = (index, key, value) => {
    const updated = [...conditions];

    updated[index][key] = value;

    setConditions(updated);
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {conditions.map((condition, index) => (
        <AdvancedConditionCard
          key={index}
          condition={condition}
          index={index}
          updateCondition={updateCondition}
          removeCondition={removeCondition}
        />
      ))}

      <Button onClick={addCondition}>Add Condition</Button>
    </div>
  );
}
