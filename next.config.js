/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // 👈 Esto desactiva que ESLint rompa el build
    },
  }
  
  module.exports = nextConfig
  