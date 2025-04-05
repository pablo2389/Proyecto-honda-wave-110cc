// next.config.js
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚨 Esto permite deployar aunque haya errores de lint
  },
};

module.exports = nextConfig;
