/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
          port: '', // Leave empty unless a specific port is required
          pathname: '/**', // Allow all paths under this hostname
        },
      ],
    },
  };
  
  export default nextConfig;
  