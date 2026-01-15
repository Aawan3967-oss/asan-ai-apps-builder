/** Minimal Next.js config for PWA-friendly build (no heavy plugins) */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  // Add any needed rewrites for deployment later
  images: {
    unoptimized: true
  },
  env: {
    AI_PROVIDER: process.env.AI_PROVIDER || 'openai'
  }
};
