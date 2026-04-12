"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface Ember {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function AmbientEffects({ isSmoking = false }: { isSmoking?: boolean }) {
  const embers = useMemo<Ember[]>(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 1.5 + Math.random() * 3,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {/* Floating ember particles */}
      {embers.map((e) => (
        <motion.div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            bottom: "-4px",
            width: e.size,
            height: e.size,
            background:
              e.id % 3 === 0
                ? "rgba(232, 166, 48, 0.6)"
                : e.id % 3 === 1
                ? "rgba(245, 158, 11, 0.6)"
                : "rgba(196, 94, 26, 0.5)",
            boxShadow:
              e.id % 2 === 0
                ? "0 0 6px rgba(232,166,48,0.3)"
                : "0 0 6px rgba(245,158,11,0.3)",
          }}
          animate={{
            y: [0, -940],
            x: [0, (e.id % 2 === 0 ? 1 : -1) * (10 + (e.id * 7) % 30)],
            opacity: [0, e.opacity, e.opacity, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Fog layer - bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, rgba(8,6,4,0.7) 0%, rgba(26,15,5,0.15) 40%, transparent 100%)",
          filter: "blur(8px)",
        }}
        animate={{
          opacity: isSmoking ? [0.8, 1, 0.8] : [0.6, 0.75, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ambient warm glow - center */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,166,48,0.04) 0%, rgba(232,166,48,0.01) 40%, transparent 65%)",
        }}
        animate={{
          scale: isSmoking ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: isSmoking ? [1, 1.3, 1] : [0.8, 1, 0.8],
        }}
        transition={{
          duration: isSmoking ? 2 : 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Warm haze glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] md:w-[800px] md:h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(245,158,11,0.03) 0%, rgba(234,88,12,0.015) 50%, transparent 70%)",
        }}
        animate={{
          opacity: isSmoking ? [0.8, 1.2, 0.8] : [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
