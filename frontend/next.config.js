/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Exclude src directory from webpack compilation
    config.module.rules.push({
      test: /\.(jsx?|tsx?)$/,
      exclude: /src/,
    });
    return config;
  },
};

export default nextConfig;