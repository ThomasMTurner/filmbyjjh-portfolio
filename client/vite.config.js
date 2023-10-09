import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({ 
  server: {
    open:true,
  },
  debug: true,
  assetsInclude:['**/*.mp4', '**/*.JPG'],
  plugins: [
    react()
  ],
  build: {
    rollupOptions: {
      input: {
        index:'./src/index.jsx'
      },
      external: [
        'os',
        'stream',
        'path',
        'zlib',
        'crypto',
        'fs',
        'http',
        'dns',
      ],
      plugins: [
        svgr()
      ]
      
    },
    esbuild: {
      loader: {
        '.jsx':'jsx'
      }
    },

    browser:'chrome'

  }
});
