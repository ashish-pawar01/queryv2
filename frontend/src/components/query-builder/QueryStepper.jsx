import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function QueryStepper({ currentStep, steps }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const completed = currentStep > index;

          const active = currentStep === index;

          return (
            <div
              key={step}
              className="flex-1 flex flex-col items-center relative"
            >
              {index < steps.length - 1 && (
                <div
                  className="
                  absolute
                  top-5
                  left-1/2
                  w-full
                  h-1
                  bg-gray-300
                  "
                />
              )}

              <motion.div
                animate={{
                  scale: active ? 1.1 : 1,
                }}
                className={`
                  z-10
                  h-10
                  w-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  border-2

                  ${
                    completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : active
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-[var(--card)] border-[var(--border)]"
                  }
                `}
              >
                {completed ? <Check size={18} /> : index + 1}
              </motion.div>

              <span
                className="
                mt-3
                text-sm
                text-center
                "
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
