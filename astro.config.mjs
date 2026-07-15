// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'framer-motion': ['framer-motion'],
            'react-vendor': ['react', 'react-dom'],
            'ui-libs': ['@mui/material', '@mui/icons-material', 'lucide-react']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@mui/material', '@emotion/react', '@emotion/styled']
    }
  },

  integrations: [react()],
  
  compressHTML: true,
  
  build: {
    inlineStylesheets: 'auto'
  }
});