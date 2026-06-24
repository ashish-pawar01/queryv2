import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        bg-[var(--card)]
        border
        border-[var(--border)]
        rounded-2xl
        p-5
        shadow-xl
        hover:shadow-2xl
        shadow-sm
        hover:shadow-xl
        transition-all
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
