import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../ui/Button";

import BasicInfoStep from "./BasicInfoStep";
import FieldBuilderStep from "./FieldBuilderStep";
import ConditionBuilderStep from "./ConditionBuilderStep";
import AccessControlStep from "./AccessControlStep";
import ReviewStep from "./ReviewStep";
import QueryStepper from "./QueryStepper";

const STEPS = [
  "Basic Info",
  "Fields",
  "Conditions",
  "Access Control",
  "Review",
];

export default function QueryWizard({ defaultValues = {}, onSubmit, loading }) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const [step, setStep] = useState(0);

  const [fields, setFields] = useState(defaultValues.fields || []);

  const [conditions, setConditions] = useState(defaultValues.conditions || []);

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };
  const [accessControl, setAccessControl] = useState(
    defaultValues.accessControl || {
      allowedRoles: [],
      allowedUsers: [],
      deniedUsers: [],
    },
  );

  const submitForm = (data) => {
    const payload = {
      ...data,
      fields,
      conditions,
      accessControl,
    };

    onSubmit(payload);
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <QueryStepper currentStep={step} steps={STEPS} />

      <form
        onSubmit={handleSubmit(submitForm)}
        className="
          bg-[var(--card)]
          border
          border-[var(--border)]
          rounded-3xl
          p-6
        "
      >
        {step === 0 && <BasicInfoStep register={register} />}

        {step === 1 && (
          <FieldBuilderStep fields={fields} setFields={setFields} />
        )}

        {step === 2 && (
          <ConditionBuilderStep
            conditions={conditions}
            setConditions={setConditions}
          />
        )}

        {step === 3 && (
          <AccessControlStep
            accessControl={accessControl}
            setAccessControl={setAccessControl}
          />
        )}

        {step === 4 && (
          <ReviewStep
            values={watch()}
            fields={fields}
            conditions={conditions}
          />
        )}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={previousStep}
            disabled={step === 0}
          >
            Previous
          </Button>

          {step === STEPS.length - 1 ? (
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create Query"}
            </Button>
          ) : (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
