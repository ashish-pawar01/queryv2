import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
            fixed inset-0
            bg-black/50
            backdrop-blur-sm
            z-40
            "
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            className="
            fixed
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            z-50
            w-full
            max-w-lg
            rounded-3xl
            bg-[var(--card)]
            border
            border-[var(--border)]
            p-6
            "
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
