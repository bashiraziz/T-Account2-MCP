import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pm2m2ek6twqqbeda.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
