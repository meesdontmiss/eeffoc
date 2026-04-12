"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function SocialPills() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="flex items-center justify-center gap-1.5 md:hidden flex-wrap px-4"
      aria-label="Social links"
    >
      {SOCIAL_LINKS.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          className="rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-200"
          style={
            i === 0
              ? {
                  background: "#FE2C55",
                  color: "white",
                }
              : {
                  background: "rgba(22,24,35,0.88)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.65)",
                }
          }
        >
          {link.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}
