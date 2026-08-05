import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Category/content images are admin-entered free-text URLs (e.g.
    // SupplicationCategory.image) — the host isn't known in advance, so a
    // fixed allowlist would break the next time an admin pastes a link
    // from a different image host. `next/image` still fetches, optimizes,
    // and caches these; only rendering-time host validation is relaxed.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
