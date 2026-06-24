import Card from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select";

import { DATA_TYPES, UI_TYPES } from "../../constants/queryConstants";

export default function AdvancedFieldCard({
  field,
  index,
  updateField,
  removeField,
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Field #{index + 1}</h3>

        <button onClick={() => removeField(index)} className="text-red-500">
          Remove
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Field Label"
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

        <Input
          label="Placeholder"
          value={field.placeholder}
          onChange={(e) => updateField(index, "placeholder", e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Select
          label="Data Type"
          options={DATA_TYPES.map((type) => ({
            _id: type,
            name: type,
          }))}
          value={field.dataType}
          onChange={(e) => updateField(index, "dataType", e.target.value)}
        />

        <Select
          label="UI Type"
          options={UI_TYPES.map((type) => ({
            _id: type,
            name: type,
          }))}
          value={field.uiType}
          onChange={(e) => updateField(index, "uiType", e.target.value)}
        />
      </div>

      <div className="flex gap-8">
        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => updateField(index, "required", e.target.checked)}
          />
          Required
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={field.selectable}
            onChange={(e) => updateField(index, "selectable", e.target.checked)}
          />
          Selectable
        </label>
      </div>
    </Card>
  );
}
