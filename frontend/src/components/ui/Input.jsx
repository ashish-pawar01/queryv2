import { forwardRef } from "react";

const Input = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label>{label}</label>}

      <input
        ref={ref}
        {...props}
        className="w-full px-4 py-3 rounded-xl border"
      />

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
