/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true, // To ignore warnings as well
  },
};

export default nextConfig;
