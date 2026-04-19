// Safe error handling — never expose database internals to end users
// Logs full error to console for developers, returns generic Arabic message to UI

const PG_ERROR_MAP: Record<string, string> = {
  '23505': 'هذا السجل موجود بالفعل',
  '23503': 'البيانات المرتبطة غير صحيحة',
  '23502': 'يرجى ملء جميع الحقول المطلوبة',
  '23514': 'البيانات المدخلة غير مطابقة للشروط',
  '42501': 'ليس لديك صلاحية لتنفيذ هذا الإجراء',
  'PGRST116': 'لم يتم العثور على البيانات المطلوبة',
};

const AUTH_ERROR_MAP: Record<string, string> = {
  'invalid_credentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
  'email_not_confirmed': 'يرجى تأكيد البريد الإلكتروني أولاً',
  'user_already_exists': 'هذا البريد الإلكتروني مسجل بالفعل',
  'weak_password': 'كلمة المرور ضعيفة جداً',
  'over_email_send_rate_limit': 'تم تجاوز الحد المسموح. حاول لاحقاً',
};

export function getSafeErrorMessage(error: unknown, fallback = 'حدث خطأ، يرجى المحاولة لاحقاً'): string {
  // Dev-only logging — never reaches the user
  if (import.meta.env.DEV) {
    console.error('[App Error]', error);
  }

  if (!error) return fallback;

  const err = error as { code?: string; message?: string; status?: number };

  if (err.code && PG_ERROR_MAP[err.code]) return PG_ERROR_MAP[err.code];
  if (err.code && AUTH_ERROR_MAP[err.code]) return AUTH_ERROR_MAP[err.code];

  // Map common Supabase auth message patterns
  const msg = (err.message || '').toLowerCase();
  if (msg.includes('invalid login credentials')) return AUTH_ERROR_MAP.invalid_credentials;
  if (msg.includes('email not confirmed')) return AUTH_ERROR_MAP.email_not_confirmed;
  if (msg.includes('already registered') || msg.includes('already exists')) return AUTH_ERROR_MAP.user_already_exists;
  if (msg.includes('rate limit')) return AUTH_ERROR_MAP.over_email_send_rate_limit;
  if (msg.includes('row-level security') || msg.includes('permission denied')) return PG_ERROR_MAP['42501'];

  return fallback;
}
