import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // Dodajemy konkretny adres Twojego studia, bez gwiazdek, żeby nie było wątpliwości
            value: "frame-ancestors 'self' https://velomind-admin.sanity.studio http://localhost:3333 https://*.sanity.studio",
          },
          {
            key: "X-Frame-Options",
            // Usuwamy to całkowicie, bo gryzie się z CSP
            value: "ALLOWALL", 
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Tymczasowo pozwalamy na wszystko, żeby wykluczyć błąd CORS
          }
        ],
      },
    ];
  },
};

export default nextConfig;