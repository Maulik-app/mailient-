import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Always render <title>, description and rel=canonical inside <head>. Next's
  // default streams metadata into <body> for any user agent outside its short
  // bot list, which misses Googlebot and the AI search crawlers (OAI-SearchBot,
  // PerplexityBot, Claude-SearchBot); Google ignores a canonical outside <head>.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
