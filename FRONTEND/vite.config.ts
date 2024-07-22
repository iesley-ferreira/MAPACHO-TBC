import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    root: '.',
    build: {
      rollupOptions: {
        input: './src/index.tsx',
      },
    },
    server: {
      host: '0.0.0.0',
    },
    define: {
      'process.env': Object.fromEntries(
        Object.entries(env).filter(([key]) => key.startsWith('VITE_')),
      ),
    },
  };
});
