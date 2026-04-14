"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-20"
      style={{
        background: "linear-gradient(to bottom, #080604 0%, #0a0806 50%, #080604 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-center"
      >
        {/* Alien gif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <Image
            src="/0069-alien.gif"
            alt="eeffoc alien"
            width={80}
            height={80}
            unoptimized
            className="mx-auto rounded-full"
          />
        </motion.div>

        {/* Section title */}
        <h2 className="text-3xl md:text-5xl font-black tracking-[0.1em] uppercase mb-8 select-none">
          {"BEHIND THE VIBES".split("").map((char, i) => {
            if (char === " ") return <span key={i}>&nbsp;</span>;
            const colors = ["#3D9B35", "#FCD116", "#CE1126"];
            return (
              <span key={i} style={{ color: colors[i % 3] }}>
                {char}
              </span>
            );
          })}
        </h2>

        {/* Creator info */}
        <div className="space-y-6 text-white/60 text-base md:text-lg leading-relaxed">
          <p>
            <span className="text-white font-semibold">@3iballer</span> on TikTok
          </p>

          <p>
            Created <span className="font-semibold" style={{ color: "#3D9B35" }}>eeffoc the alien</span> to 
            bring positivity and carefree vibes back to the forefront of memes.
          </p>

          <p className="text-white/40 text-sm md:text-base">
            No stress. No drama. Just good energy. ✌️
          </p>
        </div>

        {/* TikTok link */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="https://www.tiktok.com/@3iballer"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all"
            style={{
              background: "#FE2C55",
              color: "white",
            }}
          >
            Follow @3iballer
          </motion.a>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all border border-[#3D9B35]/70 bg-[#0f170d] text-[#7dd46a] hover:bg-[#1a2615]"
            >
              Open Gallery
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
