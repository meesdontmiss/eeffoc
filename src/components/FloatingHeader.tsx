"use client";

import { motion } from "framer-motion";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export default function FloatingHeader() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="flex items-center justify-between px-4 py-2 md:px-8 md:py-0"
        style={{
          background: "rgba(22, 24, 35, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Brand — Rasta per-letter colors */}
        <a href="#top" className="no-underline">
          <motion.span
            className="text-base font-black tracking-[0.18em] uppercase select-none"
            whileHover={{ scale: 1.04 }}
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
          </motion.span>
        </a>

        {/* Desktop nav — TikTok "Following / For You" tab style */}
        <nav className="hidden md:flex items-end gap-0 h-12" aria-label="Social links">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center h-full px-5 text-[13px] font-semibold tracking-wide text-white/50 hover:text-white transition-colors duration-200"
              whileTap={{ scale: 0.97 }}
              style={i === 0 ? { color: "rgba(255,255,255,0.95)" } : undefined}
            >
              {link.label}
              {/* TikTok-style underline indicator */}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-200"
                style={{
                  background: "#FE2C55",
                  width: i === 0 ? "60%" : "0%",
                }}
              />
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.5)", width: "60%" }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Mobile — TikTok-style compact links */}
        <div className="flex items-center gap-1 md:hidden">
          {SOCIAL_LINKS.slice(0, 3).map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase transition-colors"
              style={{
                color: i === 0 ? "#FE2C55" : "rgba(255,255,255,0.5)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
