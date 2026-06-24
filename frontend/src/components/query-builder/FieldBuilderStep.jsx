import { useState } from "react";
import Button from "../ui/Button";
import AdvancedFieldCard from "./AdvancedFieldCard";

export default function FieldBuilderStep({ fields, setFields }) {
  const addField = () => {
    setFields([
      ...fields,
      {
        label: "",
        fieldKey: "",
        dbColumn: "",
        dataType: "TEXT",
        required: false,
        placeholder: "",
        selectable: true,
      },
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];

    updated[index][key] = value;

    setFields(updated);
  };

  const removeField = (index) => {
    const updated = fields.filter((_, i) => i !== index);

    setFields(updated);
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <AdvancedFieldCard
          key={index}
          field={field}
          index={index}
          updateField={updateField}
          removeField={removeField}
        />
      ))}

      <Button onClick={addField}>Add Field</Button>
    </div>
  );
}
