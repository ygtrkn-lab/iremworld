/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com']
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Memory ve performance optimizasyonları
  experimental: {
    // Memory kullanımını azalt
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    // WebAssembly optimizasyonu
    webVitalsAttribution: ['CLS', 'LCP'],
    // WebAssembly devre dışı bırak
    disableWebAssembly: true,
    // Chunk boyutlarını küçült
    largePageDataBytes: 128 * 1000,
  },
  
  // Webpack optimizasyonları
  webpack: (config, { dev, isServer }) => {
    // Production'da memory optimizasyonu
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 244000, // Daha küçük chunk'lar
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
              maxSize: 244000,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
              maxSize: 244000,
            },
          },
        },
      }
    }
    
    // Memory limit ayarları
    config.optimization.minimize = !dev

    // WebAssembly devre dışı bırak
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: false,
      syncWebAssembly: false,
    };

    // Gereksiz modülleri devre dışı bırak
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    return config
  },
  
  // Environment variables'ları build sırasında kullanılabilir yap
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
  },
  
  // Production için ek optimizasyonlar
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
  
  // Static file serving optimizasyonu
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
