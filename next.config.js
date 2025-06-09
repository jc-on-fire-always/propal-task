/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // experimental: {
  //   serverComponentsExternalPackages: ['convex']
  // }
};

export default nextConfig;
