export const SITE = {
  name: "eeffoc",
  tagline: "intergalactic chiefing protocol",
  contractAddress: "EHgUx5N7QPowAk94Narv5hu59WdZwggiLra213p8pump",
  statusMessage: "transmission active",
} as const;

export interface SocialLink {
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X", href: "https://x.com/i/communities/1927011192028967307" },
  { label: "TikTok", href: "https://www.tiktok.com/@3iballer" },
  { label: "Dexscreener", href: "https://dexscreener.com/solana/abynhcpeo8v2vwbhxdgskgxvmtyph2bknmzmyxzvpmfz" },
];

export interface VideoClip {
  src: string;
  alt?: string;
}

export const VIDEO_CLIPS: VideoClip[] = [
  { src: "/ssstik.io_1776021246868.mp4" },
  { src: "/ssstik.io_1776021307526.mp4" },
  { src: "/ssstik.io_@3iballer_1776021217846.mp4" },
  { src: "/ssstik.io_@3iballer_1776021333762.mp4" },
  { src: "/ssstik.io_@3iballer_1776021403400.mp4" },
  { src: "/ssstik.io_@3iballer_1776021436297.mp4" },
];

export const ALIEN_SMOKE_ORIGIN = { x: 0.52, y: 0.35 } as const;
