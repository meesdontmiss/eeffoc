"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MediaItem } from "./types";

type GalleryClientProps = {
  memes: MediaItem[];
  videos: MediaItem[];
};

export default function GalleryClient({ memes, videos }: GalleryClientProps) {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  return (
    <>
      <main className="min-h-dvh px-4 py-10 md:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl space-y-10">
          <header className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                  Eeffoc Media Vault
                </p>
                <h1 className="text-2xl font-black uppercase tracking-[0.08em] text-white md:text-4xl">
                  Memes + Videos Gallery
                </h1>
                <p className="text-sm text-white/65 md:text-base">
                  Click any image or video to enlarge. Press{" "}
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-white">Esc</span>{" "}
                  or tap outside to close.
                </p>
              </div>

              <Link
                href="/#about"
                className="inline-flex items-center rounded-full border border-[#3D9B35]/70 bg-[#10170d] px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7dd46a] transition-colors hover:bg-[#182312]"
              >
                Back to Artist Info
              </Link>
            </div>
          </header>

          <section className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-extrabold uppercase tracking-[0.08em] text-[#7dd46a] md:text-2xl">
                Videos ({videos.length})
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((item) => (
                <article
                  key={item.url}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-black/35"
                >
                  <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className="group block aspect-video w-full bg-black"
                    aria-label={`Open ${item.name}`}
                  >
                    <video
                      src={item.url}
                      preload="metadata"
                      muted
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </button>
                  <div className="flex items-center justify-end p-3">
                    <a
                      href={item.url}
                      download={item.name}
                      className="shrink-0 rounded-lg bg-[#3D9B35] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-black hover:bg-[#68be57]"
                    >
                      Download
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-extrabold uppercase tracking-[0.08em] text-[#FCD116] md:text-2xl">
                Memes ({memes.length})
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {memes.map((item) => (
                <article
                  key={item.url}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-black/35"
                >
                  <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className="group relative block aspect-square w-full bg-black"
                    aria-label={`Open ${item.name}`}
                  >
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      unoptimized
                      className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </button>
                  <div className="flex items-center justify-end p-3">
                    <a
                      href={item.url}
                      download={item.name}
                      className="shrink-0 rounded-lg bg-[#FCD116] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-black hover:bg-[#ffdd4f]"
                    >
                      Download
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
        >
          <div className="flex min-h-dvh items-center justify-center p-3 md:p-6">
            <div
              className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-black/80 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
                <p className="truncate pr-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/85 md:text-base">
                  Media Preview
                </p>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="rounded-md border border-white/25 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-white/10"
                  aria-label="Close preview"
                >
                  Close
                </button>
              </div>

              <div className="max-h-[78dvh] overflow-auto p-3 md:p-5">
                {activeItem.kind === "video" ? (
                  <video
                    src={activeItem.url}
                    controls
                    autoPlay
                    className="mx-auto max-h-[70dvh] w-auto max-w-full rounded-lg"
                  />
                ) : (
                  <Image
                    src={activeItem.url}
                    alt={activeItem.name}
                    width={1800}
                    height={1800}
                    unoptimized
                    className="mx-auto h-auto max-h-[70dvh] w-auto max-w-full rounded-lg object-contain"
                  />
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/15 px-4 py-3">
                <p className="text-xs text-white/60">Click outside or press Esc to exit</p>
                <a
                  href={activeItem.url}
                  download={activeItem.name}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-black hover:bg-white/85"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
