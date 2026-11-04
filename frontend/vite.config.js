import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('/node_modules/')) {
            if (
              normalizedId.includes('/react/') ||
              normalizedId.includes('/react-dom/') ||
              normalizedId.includes('/react-router/') ||
              normalizedId.includes('/react-router-dom/') ||
              normalizedId.includes('/react-helmet-async/')
            ) {
              return 'vendor-react';
            }
            if (normalizedId.includes('/chart.js/') || normalizedId.includes('/react-chartjs-2/')) {
              return 'vendor-charts';
            }
            if (normalizedId.includes('/bootstrap/') || normalizedId.includes('/react-bootstrap/')) {
              return 'vendor-bootstrap';
            }
          }
        },
      },
    },
  },
  server: {
    historyApiFallback: true,
  },
})
