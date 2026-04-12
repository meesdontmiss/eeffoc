"use client";

import { useRef, useCallback } from "react";

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
  const ctxRef = useRef<AudioContext | null>(null);

  const playSmoke = useCallback(() => {
    try {
      const ctx = getCtx(ctxRef);
      const now = ctx.currentTime;

      // — Crackle layer: filtered noise burst —
      const bufLen = Math.floor(ctx.sampleRate * 0.35);
      const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.12));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;

      const crackleFilter = ctx.createBiquadFilter();
      crackleFilter.type = "bandpass";
      crackleFilter.frequency.value = 3200;
      crackleFilter.Q.value = 1.2;

      const crackleGain = ctx.createGain();
      crackleGain.gain.setValueAtTime(0.55, now);
      crackleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(crackleFilter);
      crackleFilter.connect(crackleGain);
      crackleGain.connect(ctx.destination);
      noise.start(now);

      // — Inhale layer: low rumble —
      const inhaleLen = Math.floor(ctx.sampleRate * 0.55);
      const inhaleBuf = ctx.createBuffer(1, inhaleLen, ctx.sampleRate);
      const inhaleData = inhaleBuf.getChannelData(0);
      for (let i = 0; i < inhaleLen; i++) {
        inhaleData[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / inhaleLen);
      }
      const inhale = ctx.createBufferSource();
      inhale.buffer = inhaleBuf;

      const inhaleFilter = ctx.createBiquadFilter();
      inhaleFilter.type = "lowpass";
      inhaleFilter.frequency.value = 280;

      const inhaleGain = ctx.createGain();
      inhaleGain.gain.setValueAtTime(0.0, now);
      inhaleGain.gain.linearRampToValueAtTime(0.35, now + 0.08);
      inhaleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      inhale.connect(inhaleFilter);
      inhaleFilter.connect(inhaleGain);
      inhaleGain.connect(ctx.destination);
      inhale.start(now);
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
