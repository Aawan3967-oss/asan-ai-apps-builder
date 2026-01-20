/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* ٹائپ اسکرپٹ کے ایررز کو بلڈ کے دوران نظر انداز کرنے کے لیے (اگر کوئی چھوٹا ایرر ہو) */
  typescript: {
    ignoreBuildErrors: true,
  },
  /* لنٹنگ کے ایررز کو بلڈ کے دوران نظر انداز کرنے کے لیے */
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* اگر آپ تصاویر استعمال کر رہے ہیں تو ان کے ڈومینز یہاں شامل کریں */
  images: {
    domains: ['lh3.googleusercontent.com'], // گوگل پروفائل تصاویر کے لیے
  },
}

module.exports = nextConfig
