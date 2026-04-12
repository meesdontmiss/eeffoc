"use client";

import { motion } from "framer-motion";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export default function FooterStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: "rgba(22, 24, 35, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Desktop: TikTok-style bottom nav row */}
      <div className="hidden md:flex items-center justify-between px-10 py-3">
        {/* Left: live status dot */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: "#FE2C55", opacity: 0.7 }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#FE2C55" }} />
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
            {SITE.statusMessage}
          </span>
        </div>

        {/* Center: TikTok-style nav icons */}
        <div className="flex items-center gap-8">
          {SOCIAL_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold tracking-widest uppercase transition-colors duration-200 hover:text-white"
              style={{ color: i === 0 ? "#FE2C55" : "rgba(255,255,255,0.35)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: spacer */}
        <div className="w-24" />
      </div>

      {/* Mobile: centered status only */}
      <div className="flex md:hidden items-center justify-center gap-2 py-3 pb-5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: "#FE2C55", opacity: 0.7 }} />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#FE2C55" }} />
        </span>
        <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
          {SITE.statusMessage}
        </span>
      </div>
    </motion.div>
  );
}
