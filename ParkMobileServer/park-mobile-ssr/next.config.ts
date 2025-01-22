import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5164/api/:path*",
      },
    ];
  },
  webpack(config) {
    return config;
  },
  // Раскомментировать только для сборки FireBase
  // output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["antd", "@ant-design/icons", "lodash-es"]
  }
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
