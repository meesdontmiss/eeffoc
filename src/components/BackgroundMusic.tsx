"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface BackgroundMusicProps {
  triggerPlay?: boolean;
}

export default function BackgroundMusic({ triggerPlay }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || startedRef.current) return;
    startedRef.current = true;
    audio.volume = 0.22;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  useEffect(() => {
    if (triggerPlay) start();
  }, [triggerPlay, start]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!startedRef.current) {
      start();
      return;
    }
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing, start]);

  return (
    <>
      {/* Hidden audio element — drop music.mp3 in /public to activate */}
      <audio ref={audioRef} src="/Still Blazin - Wiz Khalifa Ft. Alborosie.mp3" loop preload="none" />

      {/* Floating toggle button */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-20 right-4 md:bottom-5 md:right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "rgba(22,24,35,0.88)",
          border: `1px solid ${playing ? "rgba(61,155,53,0.6)" : "rgba(255,255,255,0.12)"}`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: playing ? "0 0 18px rgba(61,155,53,0.25)" : "none",
        }}
      >
        {playing ? (
          /* Pause bars */
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="1" width="3.5" height="12" rx="1" fill="#3D9B35" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="#3D9B35" />
          </svg>
        ) : (
          /* Music note */
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
