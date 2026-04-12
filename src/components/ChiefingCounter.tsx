"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ChiefingCounterProps {
  count: number | null;
}

export default function ChiefingCounter({ count }: ChiefingCounterProps) {
  const display = count === null ? "—" : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
      className="flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 select-none"
      style={{
        background: "rgba(22, 24, 35, 0.82)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <span className="text-base leading-none">💨</span>

      <div className="flex items-baseline gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={display}
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-sm font-black tabular-nums"
            style={{ color: "#FE2C55" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
        <span
          className="text-[11px] font-semibold tracking-wide uppercase"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          puffs taken
        </span>
      </div>
    </motion.div>
  );
}
