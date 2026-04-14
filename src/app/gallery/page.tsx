import fs from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import GalleryClient from "./GalleryClient";
import type { MediaItem } from "./types";

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
  await connection();

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

  return <GalleryClient memes={memes} videos={videos} />;
}
