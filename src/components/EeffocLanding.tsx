"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/lib/hooks";
import { SITE } from "@/lib/constants";

import FloatingHeader from "./FloatingHeader";
import HeroBackgroundMontage from "./HeroBackgroundMontage";
import AlienHero from "./AlienHero";
import SmokeEffect, { useSmokeEmitter } from "./SmokeEffect";
import ContractCard from "./ContractCard";
import SocialPills from "./SocialPills";
import AmbientEffects from "./AmbientEffects";
import ChiefingCounter from "./ChiefingCounter";
import BackgroundMusic from "./BackgroundMusic";
import { useSoundEffects } from "@/lib/useSoundEffects";

const SMOKE_DURATION = 1600;

export default function EeffocLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const [isSmoking, setIsSmoking] = useState(false);
  const [puffCount, setPuffCount] = useState<number | null>(null);
  const [musicTrigger, setMusicTrigger] = useState(false);
  const { particles, emit } = useSmokeEmitter();
  const { playSmoke, playPing } = useSoundEffects();

  useEffect(() => {
    fetch("/api/puffs")
      .then((r) => r.json())
      .then((d) => setPuffCount(d.count))
      .catch(() => {});
  }, []);

  const handleSmoke = useCallback(() => {
    if (isSmoking) return;
    setIsSmoking(true);
    setMusicTrigger(true);
    playSmoke();
    setTimeout(() => playPing(), 600);

    const containerEl = containerRef.current;
    if (containerEl) {
      const alienEl = containerEl.querySelector("[data-alien]") as HTMLElement | null;
      if (alienEl) {
        const containerRect = containerEl.getBoundingClientRect();
        const alienRect = alienEl.getBoundingClientRect();
        // Joint is at ~38% from left, ~27% from top of the image bounds
        const smokeX = alienRect.left - containerRect.left + alienRect.width * 0.38;
        const smokeY = alienRect.top - containerRect.top + alienRect.height * 0.27;
        emit(smokeX, smokeY);
      } else {
        emit(containerEl.clientWidth * 0.5, containerEl.clientHeight * 0.32);
      }
    }

    fetch("/api/puffs", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setPuffCount(d.count))
      .catch(() => {});

    setTimeout(() => {
      setIsSmoking(false);
    }, SMOKE_DURATION);
  }, [isSmoking, emit, playSmoke, playPing]);

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-full overflow-hidden noise-overlay"
    >
      {/* Layer 0: Video montage background */}
      <HeroBackgroundMontage mouseX={mouse.x} mouseY={mouse.y} />

      {/* Layer 1: Ambient effects */}
      <AmbientEffects isSmoking={isSmoking} />

      {/* Background music */}
      <BackgroundMusic triggerPlay={musicTrigger} />

      {/* Layer 2: Smoke particles */}
      <SmokeEffect particles={particles} />

      {/* Layer 3: Floating header */}
      <FloatingHeader />

      {/* Layer 4: Main content */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center px-4 md:px-8 pt-16 pb-14 md:pt-20 md:pb-16 overflow-y-auto">
        {/* Hero section */}
        <div className="flex flex-col items-center gap-2 md:gap-6 lg:gap-8">
          {/* Brand name — rasta per-letter colors */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.12em] md:tracking-[0.15em] uppercase select-none"
            style={{ fontWeight: 900 }}
          >
            {SITE.name.split("").map((char, i) => {
              const colors = ["#3D9B35", "#FCD116", "#CE1126"];
              return (
                <span key={i} style={{ color: colors[i % 3] }}>
                  {char}
                </span>
              );
            })}
          </motion.h1>

          {/* Alien hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <AlienHero
              mouseX={mouse.x}
              mouseY={mouse.y}
              isSmoking={isSmoking}
              onSmoke={handleSmoke}
            />
          </motion.div>

          {/* Chiefing counter */}
          <ChiefingCounter count={puffCount} />

          {/* Contract card */}
          <ContractCard />

          {/* Mobile social pills */}
          <SocialPills />
        </div>
      </div>


    </div>
  );
}
