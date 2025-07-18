// vite.config.js - Optimized for Performance
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://rayxueportfolio.com',
    }),
    // Add compression plugin
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    })
  ],
  
  // Build optimizations
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Manual chunking for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion'],
          
          // Lazy-loaded components
          'projects': [
            './src/components/ProjectSection.jsx',
            './src/components/ProjectSection2.jsx',
            './src/components/ProjectSection3.jsx',
            './src/components/ProjectSection4.jsx'
          ],
          
          // Planets
          'planets': [
            './src/components/PlanetSVG.jsx',
            './src/components/Ring.jsx',
            './src/components/Planet2.jsx',
            './src/components/Planet3.jsx'
          ]
        }
      }
    },
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Development optimizations
  server: {
    hmr: {
      overlay: false // Disable error overlay for better performance
    }
  },
  
  // CSS optimizations
  css: {
    devSourcemap: false
  }
});