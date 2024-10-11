/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ethplorer.io"], // Allow images from ethplorer.io
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
