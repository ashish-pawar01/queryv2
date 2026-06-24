import { forwardRef } from "react";

const Select = forwardRef(({ label, options = [], ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label>{label}</label>}

      <select
        ref={ref}
        {...props}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          "
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
