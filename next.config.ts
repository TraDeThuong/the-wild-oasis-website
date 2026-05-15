import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  /* config options here */
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'pfqftttjuxrgmsbpmfsf.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/**',
        },
        {
          protocol: "https",
          hostname: "**.googleusercontent.com",
        },
      ],
    },
  // output: "export"
};

module.exports = nextConfig
