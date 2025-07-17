/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable WebAssembly support
    wasm: true,
  },
  webpack(config, { isServer }) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

export default nextConfig;
