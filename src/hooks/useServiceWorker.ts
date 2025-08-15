import { useEffect, useState } from 'react';
import { useToast } from './use-toast';

export function useServiceWorker() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // تسجيل Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
            
            // التحقق من التحديثات
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    setUpdateAvailable(true);
                    toast({
                      title: "تحديث متاح",
                      description: "يتوفر إصدار جديد من التطبيق",
                    });
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.log('SW registration failed: ', error);
          });
      });
    }

    // مراقبة حالة الاتصال
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "تم استعادة الاتصال",
        description: "عاد الاتصال بالإنترنت",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "انقطع الاتصال",
        description: "أنت تعمل الآن في وضع عدم الاتصال",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return {
    isOnline,
    updateAvailable,
  };
}