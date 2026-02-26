import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  
  // DODAJEMY TO PONIŻEJ:
  async headers() {
    return [
      {
        // To pozwala Sanity Studio "wkładać" Twój blog do swojej ramki podglądu
        source: "/api/draft",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://velomind-admin.sanity.studio",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // frame-ancestors to kluczowa komenda - pozwalamy na ramki z localhosta i Twojego panelu Sanity
            value: "frame-ancestors 'self' https://velomind-admin.sanity.studio http://localhost:3333",
          },
        ],
      },
    ];
  },
};

export default nextConfig;