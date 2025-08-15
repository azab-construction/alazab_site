import { useEffect, useCallback } from 'react';

// تحسين الأداء وإدارة الذاكرة
export function usePerformanceOptimization() {
  // تنظيف الاستماع للأحداث عند إلغاء التركيب
  const cleanupEventListeners = useCallback(() => {
    // إزالة أي مستمعين للأحداث غير المستخدمين
    const events = ['resize', 'scroll', 'mousemove'];
    events.forEach(event => {
      window.removeEventListener(event, () => {});
    });
  }, []);

  // تحسين أداء الصور
  const optimizeImages = useCallback(() => {
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        const image = img as HTMLImageElement;
        image.src = image.dataset.src || '';
        image.removeAttribute('data-src');
      });
    }
  }, []);

  // تفعيل ضغط النصوص
  const enableTextCompression = useCallback(() => {
    if ('serviceWorker' in navigator) {
      // تفعيل ضغط البيانات عبر Service Worker
      navigator.serviceWorker.ready.then(registration => {
        if (registration.active) {
          registration.active.postMessage({
            type: 'ENABLE_COMPRESSION',
            payload: true
          });
        }
      });
    }
  }, []);

  // مراقبة استخدام الذاكرة
  const monitorMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      const usage = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
      
      if (usage > 0.8) {
        console.warn('High memory usage detected:', usage);
        // تنظيف الذاكرة إذا أمكن
        if (typeof window.gc === 'function') {
          window.gc();
        }
      }
    }
  }, []);

  useEffect(() => {
    // تشغيل التحسينات عند تحميل المكون
    optimizeImages();
    enableTextCompression();
    
    // مراقبة الذاكرة كل 30 ثانية
    const memoryInterval = setInterval(monitorMemoryUsage, 30000);

    return () => {
      cleanupEventListeners();
      clearInterval(memoryInterval);
    };
  }, [optimizeImages, enableTextCompression, monitorMemoryUsage, cleanupEventListeners]);

  return {
    optimizeImages,
    monitorMemoryUsage,
  };
}