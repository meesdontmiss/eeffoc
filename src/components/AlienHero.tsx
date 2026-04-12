"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AlienHeroProps {
  mouseX: number;
  mouseY: number;
  isSmoking: boolean;
  onSmoke: () => void;
}

export default function AlienHero({ mouseX, mouseY, isSmoking, onSmoke }: AlienHeroProps) {
  const [isHovered, setIsHovered] = useState(false);
  const tiltX = (mouseX - 0.5) * 8;
  const tiltY = (mouseY - 0.5) * -6;

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Always-on idle pulse — subtle hint of interactivity */}
      <motion.div
        className="absolute w-[240px] h-[240px] md:w-[520px] md:h-[520px] rounded-full pointer-events-none"
        animate={{
          scale: isSmoking ? [1, 1.18, 1] : isHovered ? [1, 1.08, 1] : [1, 1.04, 1],
          opacity: isSmoking ? [0.7, 1, 0.7] : isHovered ? [0.7, 1, 0.7] : [0.15, 0.3, 0.15],
        }}
        transition={{ duration: isSmoking ? 1.2 : isHovered ? 1.0 : 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: isSmoking
            ? "radial-gradient(circle, rgba(254,44,85,0.18) 0%, rgba(61,155,53,0.08) 50%, transparent 70%)"
            : isHovered
            ? "radial-gradient(circle, rgba(61,155,53,0.22) 0%, rgba(252,209,22,0.08) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(61,155,53,0.1) 0%, transparent 65%)",
          filter: "blur(2px)",
        }}
      />

      {/* Alien container — parallax tilt only, no float */}
      <motion.div
        className="relative z-10"
        animate={{ x: tiltX, y: tiltY }}
        transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
      >
        {/* Clickable PNG container */}
        <motion.div
          data-alien
          onClick={onSmoke}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileTap={{ scale: 0.95 }}
          className="relative w-[180px] h-[250px] md:w-[400px] md:h-[560px] cursor-pointer"
        >
          {/* Hover glow overlay */}
          <motion.div
            className="absolute inset-[-24px] rounded-full pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(61,155,53,0.28) 0%, rgba(252,209,22,0.1) 45%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />

          {/* Idle image */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isSmoking ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          >
            <Image
              src="/eeffoc-1.png"
              alt="eeffoc"
              fill
              unoptimized
              priority
              className="object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </motion.div>

          {/* Smoking image */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isSmoking ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <Image
              src="/eeffoc-2.png"
              alt="eeffoc smoking"
              fill
              unoptimized
              priority
              className="object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
