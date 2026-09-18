/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**',
        },
      ],
      formats: ['image/avif', 'image/webp'],
    },
    // French was removed from the site; /fr/* URLs were already indexed, so send
    // them to their English equivalent instead of a 404. Drop this if French returns.
    async redirects() {
      return [
        { source: '/fr/:path*', destination: '/en/:path*', permanent: true },
      ];
    },
  };
  
  export default nextConfig;