import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

// نصب روی گوشی: مرورگر با وجود manifest + service worker دکمهٔ «افزودن به صفحهٔ اصلی» می‌دهد.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* نصب PWA اختیاری است؛ نبود آن نباید داشبورد را بشکند */
    });
  });
}
