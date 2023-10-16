import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({ 
  server: {
    open:true,
  },
  debug: true,
  assetsInclude:['**/*.mp4', '**/*.JPG'],
  plugins: [
    svgr(),
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
      
    },
    esbuild: {
      loader: {
        '.jsx':'jsx'
      }
    },

    browser:'chrome'

  }
});
