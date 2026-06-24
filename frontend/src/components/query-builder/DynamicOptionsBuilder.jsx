import Input from "../ui/Input";

export default function DynamicOptionsBuilder({
  dynamicOptions,
  setDynamicOptions,
}) {
  return (
    <div className="space-y-4">
      <label className="flex gap-3">
        <input
          type="checkbox"
          checked={dynamicOptions.enabled}
          onChange={(e) =>
            setDynamicOptions({
              ...dynamicOptions,
              enabled: e.target.checked,
            })
          }
        />
        Enable Dynamic Options
      </label>

      {dynamicOptions.enabled && (
        <>
          <Input
            label="Source Collection"
            value={dynamicOptions.sourceCollection}
            onChange={(e) =>
              setDynamicOptions({
                ...dynamicOptions,
                sourceCollection: e.target.value,
              })
            }
          />

          <Input
            label="Label Field"
            value={dynamicOptions.labelField}
            onChange={(e) =>
              setDynamicOptions({
                ...dynamicOptions,
                labelField: e.target.value,
              })
            }
          />

          <Input
            label="Value Field"
            value={dynamicOptions.valueField}
            onChange={(e) =>
              setDynamicOptions({
                ...dynamicOptions,
                valueField: e.target.value,
              })
            }
          />
        </>
      )}
    </div>
  );
}
