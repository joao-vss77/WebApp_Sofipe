import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // permite imports como "@/components/ui/Icons"
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
