import { ImageResponse } from "next/og";
import { site } from "@/content/profile";
import { ogPalette as c } from "@/styles/theme";

export const ogSize = { width: 1200, height: 630 };

/** One layout for every Open Graph card: a kicker, a large title, and the name underneath. */
export function ogImage({ kicker, title, footnote }: { kicker: string; title: string; footnote: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: c.bg,
        color: c.fg,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 16,
            background: c.fg,
            color: c.bg,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          SA
        </div>
        <div style={{ fontSize: 26, color: c.muted }}>{kicker}</div>
      </div>
      <div style={{ display: "flex", fontSize: 84, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `2px solid ${c.line}`,
          paddingTop: 28,
          fontSize: 26,
        }}
      >
        <span>{site.name}</span>
        <span style={{ color: c.accent }}>{footnote}</span>
      </div>
    </div>,
    ogSize,
  );
}
