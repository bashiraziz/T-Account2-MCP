import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2ec0twlem0zmk2iq.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
