import Input from "../ui/Input";
import Button from "../ui/Button";

export default function FieldOptionsBuilder({ options, setOptions }) {
  const addOption = () => {
    setOptions([
      ...options,
      {
        label: "",
        value: "",
      },
    ]);
  };

  const updateOption = (index, key, value) => {
    const updated = [...options];

    updated[index][key] = value;

    setOptions(updated);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <h4 className="font-medium">Dropdown Options</h4>

        <Button type="button" onClick={addOption}>
          Add Option
        </Button>
      </div>

      {options.map((option, index) => (
        <div key={index} className="grid grid-cols-3 gap-3">
          <Input
            placeholder="Label"
            value={option.label}
            onChange={(e) => updateOption(index, "label", e.target.value)}
          />

          <Input
            placeholder="Value"
            value={option.value}
            onChange={(e) => updateOption(index, "value", e.target.value)}
          />

          <Button variant="danger" onClick={() => removeOption(index)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
