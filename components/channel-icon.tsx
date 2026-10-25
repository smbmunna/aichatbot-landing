import { MessagesSquare, Music2, Phone, Send } from "lucide-react";
import type { Channel } from "@/lib/content";

const tile: Record<Channel, string> = {
  facebook: "bg-[#1877f2]",
  instagram: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]",
  whatsapp: "bg-[#25d366]",
  web: "bg-brand-600",
  telegram: "bg-[#29a9eb]",
  tiktok: "bg-black",
  x: "bg-black",
};

function Glyph({ channel, size }: { channel: Channel; size: number }) {
  switch (channel) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="white" aria-hidden>
          <path d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3.1Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth={2} aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.9" cy="7.1" r="0.6" fill="white" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="white" aria-hidden>
          <path d="M17.5 4h2.8l-6.1 7 7.2 9h-5.6l-4.4-5.6L6.3 20H3.5l6.5-7.5L3.1 4h5.7l4 5.1L17.5 4Zm-1 14.4h1.5L7.6 5.5H6l10.5 12.9Z" />
        </svg>
      );
    case "whatsapp":
      return <Phone size={size * 0.85} color="white" strokeWidth={2.2} aria-hidden />;
    case "web":
      return <MessagesSquare size={size * 0.85} color="white" strokeWidth={2} aria-hidden />;
    case "telegram":
      return <Send size={size * 0.8} color="white" strokeWidth={2.2} aria-hidden />;
    case "tiktok":
      return <Music2 size={size * 0.85} color="white" strokeWidth={2.2} aria-hidden />;
  }
}

export function ChannelIcon({
  channel,
  size = 20,
  className = "",
}: {
  channel: Channel;
  size?: number;
  className?: string;
}) {
  const box = Math.round(size * 1.8);
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl shadow-sm ${tile[channel]} ${className}`}
      style={{ width: box, height: box }}
    >
      <Glyph channel={channel} size={size} />
    </span>
  );
}
