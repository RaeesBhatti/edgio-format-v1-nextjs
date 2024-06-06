/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: false,
  cacheMaxMemorySize: 0,
  experimental: {
    cpus: 2,
    workerThreads: false,
    serverMinification: false,
    serverSourceMaps: true,
  },
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
