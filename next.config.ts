import type { NextConfig } from "next";
import BundleAnalyzer from '@next/bundle-analyzer';

let nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: "memory",
      });
    }

    // FFmpeg WASM support
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    // Handle WASM files
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Handle Web Workers
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      use: { loader: 'worker-loader' },
    });

    // Important: return the modified config
    return config;
  },

  // Headers for cross-origin isolation (required for SharedArrayBuffer)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.lottie": ["@noxfed/lottie-webpack-loader"],
      // '*.svg': ['@svgr/webpack']
    },
  },
  experimental: {
    webpackMemoryOptimizations: true,
    webpackBuildWorker: true,
    clientTraceMetadata: ['webpackChunkName'],
  },

  output: 'standalone',
};

const WithBundleAnalyzer = BundleAnalyzer({
  enabled: true,
  openAnalyzer: false,
  analyzerMode: 'static',
  logLevel: 'info',
});
nextConfig = WithBundleAnalyzer(nextConfig);


export default nextConfig;
