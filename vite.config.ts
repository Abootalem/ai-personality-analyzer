import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Try to get API key from various environment variable names
    const apiKey = env.GEMINI_API_KEY || env.API_KEY || env.VITE_GEMINI_API_KEY || env.VITE_API_KEY;
    
    return {
      define: {
        // Define multiple possible environment variables at build time
        'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
        'process.env.API_KEY': JSON.stringify(apiKey),
        'process.env.VITE_GEMINI_API_KEY': JSON.stringify(apiKey),
        'process.env.VITE_API_KEY': JSON.stringify(apiKey),
        // For runtime access
        'globalThis.RUNTIME_API_KEY': JSON.stringify(apiKey),
        'window.GEMINI_API_KEY': JSON.stringify(apiKey),
        'window.API_KEY': JSON.stringify(apiKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Ensure environment variables are properly injected
        rollupOptions: {
          // Don't externalize process for better compatibility
          external: []
        }
      }
    };
});
