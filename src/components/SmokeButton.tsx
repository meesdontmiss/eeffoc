"use client";

import { motion } from "framer-motion";

interface SmokeButtonProps {
  isSmoking: boolean;
  onSmoke: () => void;
}

export default function SmokeButton({ isSmoking, onSmoke }: SmokeButtonProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
      className="relative"
    >
      {/* Button glow aura */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(232,166,48,0.14) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: isSmoking ? [1, 1.3, 1] : [1, 1.1, 1],
          opacity: isSmoking ? [0.8, 1, 0.8] : [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: isSmoking ? 1 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.button
        onClick={onSmoke}
        disabled={isSmoking}
        whileHover={!isSmoking ? { scale: 1.04, y: -2 } : undefined}
        whileTap={!isSmoking ? { scale: 0.97 } : undefined}
        className={`
          relative z-10 rounded-2xl px-8 py-4 md:px-12 md:py-5
          text-sm md:text-base font-semibold tracking-widest uppercase
          transition-all duration-500 cursor-pointer
          ${
            isSmoking
              ? "glass-strong text-accent/90 text-glow-accent glow-accent"
              : "glass text-foreground/80 hover:text-accent/90 hover:glow-accent"
          }
        `}
        style={{
          boxShadow: isSmoking
            ? "0 0 40px rgba(232,166,48,0.22), 0 0 80px rgba(232,166,48,0.08), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <span className="relative z-10 flex items-center gap-3">
          {/* Ember dot indicator */}
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{
              background: isSmoking
                ? "rgba(232,166,48,0.9)"
                : "rgba(245,158,11,0.6)",
              boxShadow: isSmoking
                ? "0 0 8px rgba(232,166,48,0.5)"
                : "0 0 6px rgba(245,158,11,0.3)",
            }}
            animate={{
              opacity: isSmoking ? [1, 0.5, 1] : [0.6, 1, 0.6],
              scale: isSmoking ? [1, 1.3, 1] : [1, 1.15, 1],
            }}
            transition={{
              duration: isSmoking ? 0.6 : 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {isSmoking ? "Chiefing..." : "Make Eeffoc Smoke"}
        </span>

        {/* Inner shimmer */}
        {!isSmoking && (
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            initial={false}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.04) 55%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
            />
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}
