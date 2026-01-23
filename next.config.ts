import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**", 
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
