import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint warnings ko build ke waqt ignore karega
  },
  images: {
    unoptimized: true, // ✅ Images ko optimize nahi karega (Netlify/Vercel issue avoid)
  },
  typescript: {
    // ✅ TypeScript ke strict errors ko ignore nahi kiya (safe rakha)
    // ignoreBuildErrors: true,
  },

  // ✅ Hydration aur experimental settings add kiye
  experimental: {
    // 🔥 React ke new compiler ka support
  },
  compiler: {
    reactRemoveProperties: true, // ✅ Extra HTML attributes remove karega (jo extensions inject karte)
  },
};

export default nextConfig;
