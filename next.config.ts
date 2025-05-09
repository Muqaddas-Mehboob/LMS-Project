// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images:
  {
      domains: ['utfs.io', 'img.clerk.com','gev65a2fe9.ufs.sh']
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint errors during builds
  },
}

module.exports = nextConfig