// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Saudi Arabia numbers)
export const isValidPhone = (phone: string): boolean => {
  // Accepts formats like 0501234567, 501234567, +966501234567
  const phoneRegex = /^(?:\+966|0)?[1-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Required field validation
export const isRequired = (value: string | number): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Min length validation
export const minLength = (value: string, length: number): boolean => {
  return value.length >= length;
};

// Max length validation
export const maxLength = (value: string, length: number): boolean => {
  return value.length <= length;
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Arabic text validation
export const isArabicText = (text: string): boolean => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

// Number validation
export const isValidNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && value.trim() !== '';
};

// Password strength validation
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 8) return 'weak';
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return 'medium';
  return 'strong';
};

// Validation error messages
export const validationMessages = {
  required: 'هذا الحقل مطلوب',
  email: 'البريد الإلكتروني غير صحيح',
  phone: 'رقم الهاتف غير صحيح',
  minLength: (length: number) => `يجب أن يكون الحد الأدنى ${length} أحرف`,
  maxLength: (length: number) => `يجب ألا يتجاوز ${length} أحرف`,
  password: 'كلمة المرور ضعيفة جداً',
  url: 'الرابط غير صحيح',
} as const;
