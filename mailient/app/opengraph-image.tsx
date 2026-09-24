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
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>AI inbox triage for founders on Gmail</div>
          <div style={{ fontSize: 32, color: "#a3a3a3", lineHeight: 1.35 }}>
            Sorts what needs you. Drafts when you ask. Never sends without your approval.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
