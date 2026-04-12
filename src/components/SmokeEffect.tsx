"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  rise: number;
  duration: number;
  delay: number;
  blur: number;
  peakOpacity: number;
  peakScale: number;
}

let particleId = 0;

function generateBurst(originX: number, originY: number): SmokeParticle[] {
  const count = 7;
  return Array.from({ length: count }, (_, i) => {
    particleId += 1;
    return {
      id: particleId,
      x: originX + (i % 3 === 0 ? 6 : i % 3 === 1 ? -6 : 0),
      y: originY,
      size: 40 + (i * 13) % 45,
      driftX: -(18 + (i * 11) % 48),
      rise: 80 + (i * 19) % 90,
      duration: 3.5 + (i * 0.4) % 2,
      delay: i * 0.14,
      blur: 16 + (i * 4) % 14,
      peakOpacity: 0.18 + (i * 0.035) % 0.18,
      peakScale: 2.0 + (i * 0.25) % 1.2,
    };
  });
}

export function useSmokeEmitter() {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  const emit = useCallback((originX: number, originY: number) => {
    const burst = generateBurst(originX, originY);
    setParticles((prev) => [...prev, ...burst]);
    const maxLife = Math.max(...burst.map((p) => (p.duration + p.delay) * 1000));
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !burst.some((b) => b.id === p.id))
      );
    }, maxLife + 300);
  }, []);

  return { particles, emit };
}

export default function SmokeEffect({ particles }: { particles: SmokeParticle[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, scale: 0.2, opacity: 0 }}
            animate={{
              x: p.x + p.driftX,
              y: p.y - p.rise,
              scale: p.peakScale,
              opacity: [0, p.peakOpacity, p.peakOpacity * 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
              opacity: { times: [0, 0.2, 0.55, 1], ease: "easeInOut" },
            }}
            exit={{ opacity: 0 }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              background: `radial-gradient(circle, hsla(210, 8%, 90%, ${p.peakOpacity}) 0%, hsla(210, 5%, 80%, ${p.peakOpacity * 0.5}) 40%, transparent 70%)`,
              filter: `blur(${p.blur}px)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
