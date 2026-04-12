"use client";

import { useRef, useCallback, useEffect } from "react";

function getCtx(ref: React.MutableRefObject<AudioContext | null>): AudioContext {
  if (!ref.current || ref.current.state === "closed") {
    ref.current = new AudioContext();
  }
  if (ref.current.state === "suspended") {
    ref.current.resume();
  }
  return ref.current;
}

export function useSoundEffects() {
  const smokeAudioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    smokeAudioRef.current = new Audio("/freesound_community-fumar-6420.mp3");
    smokeAudioRef.current.volume = 0.6;
  }, []);

  const playSmoke = useCallback(() => {
    try {
      const audio = smokeAudioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    } catch {
      // Audio unavailable — silently skip
    }
  }, []);

  const playPing = useCallback(() => {
    try {
      const ctx = getCtx(ctxRef);
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1046, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Audio unavailable — silently skip
    }
  }, []);

  return { playSmoke, playPing };
}
