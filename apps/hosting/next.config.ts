import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    return [
      {
        source: "/web/servicios.php",
        has: [{ type: "query", key: "s", value: "4" }],
        destination: "/especialidades/reparacion-de-proyectores",
        permanent: true,
      },
      {
        source: "/web/servicios.php",
        destination: "/especialidades",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
