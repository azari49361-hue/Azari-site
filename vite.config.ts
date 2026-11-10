import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // در حالت dev، Vite همان index.html را serve می‌کند؛ توکن OG را خالی می‌کنیم
      // تا آدرس نسبی درست بماند. در build توکن می‌ماند تا سرور آن را با دامنه پر کند.
      {
        name: 'og-base-dev',
        apply: 'serve',
        transformIndexHtml(html) {
          return html.split('__OG_BASE__').join('');
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
  };
});
