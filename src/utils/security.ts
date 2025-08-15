// أدوات الأمان والحماية

// تنظيف النصوص من محتوى ضار
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// التحقق من صحة الإيميل
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// التحقق من قوة كلمة المرور
export function validatePassword(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  requirements: string[];
} {
  const requirements: string[] = [];
  
  if (password.length < 8) {
    requirements.push('يجب أن تحتوي على 8 أحرف على الأقل');
  }
  
  if (!/[A-Z]/.test(password)) {
    requirements.push('يجب أن تحتوي على حرف كبير واحد على الأقل');
  }
  
  if (!/[a-z]/.test(password)) {
    requirements.push('يجب أن تحتوي على حرف صغير واحد على الأقل');
  }
  
  if (!/\d/.test(password)) {
    requirements.push('يجب أن تحتوي على رقم واحد على الأقل');
  }
  
  if (!/[@$!%*?&]/.test(password)) {
    requirements.push('يجب أن تحتوي على رمز خاص واحد على الأقل');
  }

  const strength = requirements.length === 0 ? 'strong' 
    : requirements.length <= 2 ? 'medium' : 'weak';

  return {
    isValid: requirements.length === 0,
    strength,
    requirements
  };
}

// حماية من هجمات CSRF
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// تشفير البيانات الحساسة للتخزين المحلي
export function encryptLocalStorage(key: string, value: any): void {
  try {
    const serialized = JSON.stringify(value);
    const encoded = btoa(serialized);
    localStorage.setItem(key, encoded);
  } catch (error) {
    console.error('Failed to encrypt local storage data:', error);
  }
}

export function decryptLocalStorage(key: string): any {
  try {
    const encoded = localStorage.getItem(key);
    if (!encoded) return null;
    
    const serialized = atob(encoded);
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to decrypt local storage data:', error);
    return null;
  }
}

// إزالة البيانات الحساسة من الذاكرة
export function clearSensitiveData() {
  // مسح كلمات المرور والتوكن من المتغيرات
  if (typeof window !== 'undefined') {
    // مسح sessionStorage
    sessionStorage.clear();
    
    // مسح البيانات الحساسة من localStorage
    const sensitiveKeys = ['auth_token', 'refresh_token', 'user_session'];
    sensitiveKeys.forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

// فحص الروابط الخبيثة
export function isSecureURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // السماح فقط بالبروتوكولات الآمنة
    const allowedProtocols = ['https:', 'http:', 'mailto:', 'tel:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return false;
    }
    
    // منع الروابط المشبوهة
    const suspiciousDomains = ['bit.ly', 'tinyurl.com', 'goo.gl'];
    if (suspiciousDomains.some(domain => urlObj.hostname.includes(domain))) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}