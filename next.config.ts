import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/mx-es/contacto',
        destination: '/mx-es/#final-cta',
        permanent: true,
      },
      {
        source: '/us-en/contact',
        destination: '/us-en/#final-cta',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
