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

};

export default nextConfig;
