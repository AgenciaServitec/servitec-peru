import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/web/servicios.php",
        has: [
          {
            type: "query",
            key: "s",
            value: "4",
          },
        ],
        destination: "/especialidades/reparacion-de-proyectores",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
