"use client";

import { useRef, useCallback, useEffect } from "react";

export function useSoundEffects() {
  const smokeAudioRef = useRef<HTMLAudioElement | null>(null);

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

  return { playSmoke };
}
