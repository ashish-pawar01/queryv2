import Button from "../ui/Button";

const validationTypes = ["required", "email", "phone", "url", "min", "max"];

export default function ValidationBuilder({ validations, setValidations }) {
  const toggleValidation = (validation) => {
    if (validations.includes(validation)) {
      setValidations(validations.filter((v) => v !== validation));
    } else {
      setValidations([...validations, validation]);
    }
  };

  return (
    <div>
      <h4 className="font-medium mb-3">Validations</h4>

      <div className="flex flex-wrap gap-2">
        {validationTypes.map((validation) => (
          <Button
            key={validation}
            type="button"
            variant={validations.includes(validation) ? "primary" : "secondary"}
            onClick={() => toggleValidation(validation)}
          >
            {validation}
          </Button>
        ))}
      </div>
    </div>
  );
}
