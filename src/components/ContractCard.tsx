"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { useCopyToClipboard } from "@/lib/hooks";

export default function ContractCard() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-[320px] md:max-w-md px-2 md:px-0"
    >
      {/* TikTok search-bar style container */}
      <div
        className="flex items-center gap-2 rounded-full px-4 py-2.5"
        style={{
          background: "rgba(22, 24, 35, 0.92)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Search icon */}
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          className="shrink-0 opacity-40"
          stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Address */}
        <p className="font-mono text-[11px] md:text-xs text-white/55 truncate flex-1 select-all">
          {SITE.contractAddress}
        </p>

        {/* TikTok-red copy button */}
        <motion.button
          onClick={() => copy(SITE.contractAddress)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          className="shrink-0 rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wide text-white transition-all duration-200"
          style={{
            background: copied ? "#25F4EE" : "#FE2C55",
            color: copied ? "#161823" : "white",
          }}
          aria-label="Copy contract address"
        >
          {copied ? "Copied!" : "Copy"}
        </motion.button>
      </div>
    </motion.div>
  );
}
