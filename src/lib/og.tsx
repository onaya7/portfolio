import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/content/profile";
import { ogPalette as c } from "@/styles/theme";

export const ogSize = { width: 1200, height: 630 };

/** The headshot as a data URI, read at build time. Satori cannot fetch a relative path. */
export function portraitDataUri(): string {
  const file = readFileSync(path.join(process.cwd(), "public/images/samuel-ayano.jpg"));
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}

/**
 * One layout for every Open Graph card: a kicker, a large title, and the name underneath, with
 * an optional photo on the right.
 */
export function ogImage({
  kicker,
  title,
  footnote,
  photo,
}: {
  kicker: string;
  title: string;
  footnote: string;
  photo?: string;
}) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: c.bg, fontFamily: "sans-serif" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: c.fg,
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
        <div
          style={{
            display: "flex",
            fontSize: photo ? 68 : 84,
            lineHeight: 1.02,
            letterSpacing: -3,
            maxWidth: photo ? 620 : 1000,
          }}
        >
          {title}
        </div>
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
      </div>
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element -- Satori renders <img>, not next/image.
        <img src={photo} alt="" width={420} height={630} style={{ objectFit: "cover", filter: "grayscale(1)" }} />
      )}
    </div>,
    ogSize,
  );
}
