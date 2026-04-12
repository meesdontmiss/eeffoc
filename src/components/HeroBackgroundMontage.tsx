"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { VIDEO_CLIPS, type VideoClip } from "@/lib/constants";

interface MontageProps {
  clips?: VideoClip[];
  mouseX?: number;
  mouseY?: number;
}

function VideoTile({ clip, index }: { clip: VideoClip; index: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <video
        src={clip.src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover scale-110"
        style={{
          filter: "brightness(0.72) saturate(0.9)",
        }}
      />
      {/* Per-tile subtle color overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            index % 3 === 0
              ? "linear-gradient(135deg, rgba(232,166,48,0.04), transparent)"
              : index % 3 === 1
              ? "linear-gradient(135deg, rgba(245,158,11,0.04), transparent)"
              : "linear-gradient(135deg, rgba(196,94,26,0.03), transparent)",
        }}
      />
    </div>
  );
}

export default function HeroBackgroundMontage({
  clips = VIDEO_CLIPS,
  mouseX = 0.5,
  mouseY = 0.5,
}: MontageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const gridConfig = useMemo(() => {
    const count = clips.length;
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    if (count <= 12) return { cols: 4, rows: 3 };
    return { cols: 5, rows: Math.ceil(count / 5) };
  }, [clips.length]);

  const parallaxX = (mouseX - 0.5) * -15;
  const parallaxY = (mouseY - 0.5) * -15;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Video grid */}
      <motion.div
        className="absolute inset-[-40px] grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
        }}
        animate={{ x: parallaxX, y: parallaxY }}
        transition={{ type: "tween", duration: 0.8, ease: "easeOut" }}
      >
        {clips.map((clip, i) => (
          <VideoTile key={`${clip.src}-${i}`} clip={clip} index={i} />
        ))}
      </motion.div>

      {/* Subtle warm tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(232,166,48,0.02) 0%, transparent 60%)",
        }}
      />

      {/* Fallback solid background when no videos loaded */}
      <div className="absolute inset-0 -z-10 bg-background" />
    </div>
  );
}
