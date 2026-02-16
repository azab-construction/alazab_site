// Service worker registration as a plain function (no hooks)
// to avoid duplicate React instance issues with Vite dep caching
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((error) => {
        console.log('SW registration failed: ', error);
      });
  }
}
