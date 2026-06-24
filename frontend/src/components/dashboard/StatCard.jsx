import { motion } from "framer-motion";

export default function StatCard({ title, value, icon, trend }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-[var(--border)]
      bg-[var(--card)]
      p-6
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-70">{title}</p>

          <h2 className="text-4xl font-bold mt-2">{value}</h2>

          {trend && <p className="mt-2 text-emerald-500 text-sm">{trend}</p>}
        </div>

        <div
          className="
          p-3
          rounded-2xl
          bg-blue-500/10
          "
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
