import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo/site";

export const alt = SITE.definitionShort;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#000",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700 }}>{SITE.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>The AI inbox employee for founders</div>
          <div style={{ fontSize: 32, color: "#a3a3a3", lineHeight: 1.35 }}>
            Sorts your Gmail by what needs a decision. Drafts, schedules, and never sends without approval.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
