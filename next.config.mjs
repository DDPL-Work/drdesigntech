/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Prevents 404 errors on subpages on shared hosting
  allowedDevOrigins: ['192.168.29.243'],
};

export default nextConfig;