import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

type MediaKind = "image" | "video";

type MediaItem = {
  name: string;
  url: string;
  kind: MediaKind;
};

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);

function toPublicUrl(relativePath: string) {
  return `/${relativePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

async function readMediaFromPublic(relativeDir: string) {
  const baseDir = path.join(process.cwd(), "public");
  const absoluteDir = relativeDir ? path.join(baseDir, relativeDir) : baseDir;
  const entries = await fs.readdir(absoluteDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const extension = path.extname(entry.name).toLowerCase();
      const relativePath = relativeDir
        ? path.join(relativeDir, entry.name)
        : entry.name;

      if (VIDEO_EXTENSIONS.has(extension)) {
        return {
          name: entry.name,
          url: toPublicUrl(relativePath),
          kind: "video" as const,
        };
      }

      if (IMAGE_EXTENSIONS.has(extension)) {
        return {
          name: entry.name,
          url: toPublicUrl(relativePath),
          kind: "image" as const,
        };
      }

      return null;
    })
    .filter((item): item is MediaItem => item !== null);
}

export default async function GalleryPage() {
  const [alienFolderMedia, rootMedia] = await Promise.all([
    readMediaFromPublic("Eeefoc alien"),
    readMediaFromPublic(""),
  ]);

  const memes = alienFolderMedia
    .filter((item) => item.kind === "image")
    .sort((a, b) => a.name.localeCompare(b.name));

  const videos = [...alienFolderMedia, ...rootMedia]
    .filter((item) => item.kind === "video")
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
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
                All memes from <span className="text-white">/public/Eeefoc alien</span> plus
                the site videos, each with one-click download.
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
                <div className="aspect-video bg-black">
                  <video
                    src={item.url}
                    controls
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-3">
                  <p className="truncate text-xs font-semibold text-white/80" title={item.name}>
                    {item.name}
                  </p>
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
                <div className="relative aspect-square bg-black">
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-3">
                  <p className="truncate text-xs font-semibold text-white/80" title={item.name}>
                    {item.name}
                  </p>
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
  );
}
