import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',                    // Frontend gọi đường này
        destination: 'http://localhost:5000/api/:path*',   // Chuyển tiếp sang Backend
      },
    ];
  },
};

export default nextConfig;