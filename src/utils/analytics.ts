// أدوات التحليلات والمراقبة

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp?: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.trackPageView();
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // تتبع زيارة الصفحة
  trackPageView(page?: string) {
    const currentPage = page || window.location.pathname;
    
    this.track({
      event: 'page_view',
      category: 'navigation',
      action: 'view',
      label: currentPage
    });
  }

  // تتبع الأحداث
  track(event: Omit<AnalyticsEvent, 'timestamp'>) {
    const analyticsEvent: AnalyticsEvent = {
      event: event.event,
      category: event.category,
      action: event.action,
      label: event.label,
      value: event.value,
      timestamp: Date.now()
    };

    this.events.push(analyticsEvent);
    
    // إرسال الأحداث للخادم (يمكن إضافة API endpoint)
    this.sendEvent(analyticsEvent);
  }

  // تتبع أخطاء JavaScript
  trackError(error: Error, errorInfo?: any) {
    this.track({
      event: 'javascript_error',
      category: 'error',
      action: 'exception',
      label: error.message,
      value: 1
    });

    // إرسال تفاصيل الخطأ للمراقبة
    console.error('Analytics Error:', error, errorInfo);
  }

  // تتبع الأداء
  trackPerformance(metric: string, value: number) {
    this.track({
      event: 'performance',
      category: 'performance',
      action: metric,
      value: Math.round(value)
    });
  }

  // تتبع تفاعل المستخدم
  trackUserInteraction(element: string, action: string) {
    this.track({
      event: 'user_interaction',
      category: 'engagement',
      action: action,
      label: element
    });
  }

  // إرسال الحدث للخادم
  private async sendEvent(event: AnalyticsEvent) {
    try {
      // يمكن إضافة API endpoint هنا للإرسال للخادم
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', event);
      }

      // مثال على إرسال البيانات
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ sessionId: this.sessionId, event })
      // });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  // الحصول على إحصائيات الجلسة
  getSessionStats() {
    return {
      sessionId: this.sessionId,
      totalEvents: this.events.length,
      startTime: this.events[0]?.timestamp || Date.now(),
      lastActivity: this.events[this.events.length - 1]?.timestamp || Date.now()
    };
  }

  // مسح الأحداث المحفوظة
  clearEvents() {
    this.events = [];
  }
}

// إنشاء مثيل واحد للتحليلات
export const analytics = new Analytics();

// تتبع أداء التطبيق
export function trackWebVitals() {
  // Core Web Vitals
  if ('PerformanceObserver' in window) {
    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        analytics.trackPerformance('FCP', entry.startTime);
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      analytics.trackPerformance('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fidEntry = entry as any;
        analytics.trackPerformance('FID', fidEntry.processingStart - fidEntry.startTime);
      }
    }).observe({ entryTypes: ['first-input'] });
  }

  // Navigation Timing
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      
      if (navigation) {
        analytics.trackPerformance('DOM_Load', navigation.domContentLoadedEventEnd - navigation.fetchStart);
        analytics.trackPerformance('Page_Load', navigation.loadEventEnd - navigation.fetchStart);
        analytics.trackPerformance('TTFB', navigation.responseStart - navigation.fetchStart);
      }
    }, 0);
  });
}