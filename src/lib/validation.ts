import { z } from 'zod';

// Reusable schemas for forms across the app
export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'البريد الإلكتروني مطلوب' })
  .email({ message: 'البريد الإلكتروني غير صالح' })
  .max(254, { message: 'البريد الإلكتروني طويل جداً' });

export const passwordSchema = z
  .string()
  .min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' })
  .max(128, { message: 'كلمة المرور طويلة جداً' });

export const strongPasswordSchema = passwordSchema
  .regex(/[A-Z]/, { message: 'يجب أن تحتوي على حرف كبير' })
  .regex(/[a-z]/, { message: 'يجب أن تحتوي على حرف صغير' })
  .regex(/\d/, { message: 'يجب أن تحتوي على رقم' });

export const nameSchema = z
  .string()
  .trim()
  .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
  .max(100, { message: 'الاسم طويل جداً' });

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s\-()]{7,20}$/, { message: 'رقم هاتف غير صالح' });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: 'كلمة المرور مطلوبة' }).max(128),
});

export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  subject: z.string().trim().min(3).max(200, { message: 'الموضوع طويل جداً' }),
  message: z.string().trim().min(10, { message: 'الرسالة قصيرة جداً' }).max(2000),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
