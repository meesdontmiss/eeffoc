export type MediaKind = "image" | "video";

export type MediaItem = {
  name: string;
  url: string;
  kind: MediaKind;
};
