/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Ignora errores de ESLint en producción
    },
    typescript: {
      ignoreBuildErrors: true, // Ignora errores de TypeScript en producción
    },
  };
  
  module.exports = nextConfig;
  