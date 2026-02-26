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
            // Dodajemy *.sanity.studio, żeby objąć każdą nazwę panelu
            value: "frame-ancestors 'self' https://*.sanity.studio http://localhost:3333",
          },
          {
            // Próbujemy wyłączyć sztywne blokowanie ramek, które narzuca Vercel
            key: "X-Frame-Options",
            value: "ALLOWALL", 
          },
        ],
      },
    ];
  },
};

export default nextConfig;