import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AuthCard from './AuthCard';
import { signupSchema } from '@/lib/validation';
import { getSafeErrorMessage } from '@/utils/errorHandler';
import { sanitizeInput } from '@/utils/security';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = signupSchema.safeParse({
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (!parsed.success) {
      toast({
        title: "بيانات غير صالحة",
        description: parsed.error.issues[0]?.message ?? "يرجى التحقق من البيانات",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          data: { name: parsed.data.name },
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast({
          title: "خطأ في إنشاء الحساب",
          description: getSafeErrorMessage(error),
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "خطأ غير متوقع",
        description: getSafeErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="إنشاء حساب جديد">
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">الاسم الكامل</Label>
          <Input id="name" name="name" type="text" value={formData.name}
            onChange={handleChange} required maxLength={100} className="text-right" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input id="email" name="email" type="email" value={formData.email}
            onChange={handleChange} required maxLength={254} autoComplete="email"
            className="text-right" dir="ltr" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input id="password" name="password" type="password" value={formData.password}
            onChange={handleChange} required minLength={8} maxLength={128}
            autoComplete="new-password" className="text-right" dir="ltr" />
          <p className="text-xs text-gray-500">8 أحرف على الأقل، تشمل حرفاً كبيراً وصغيراً ورقماً</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password"
            value={formData.confirmPassword} onChange={handleChange} required
            minLength={8} maxLength={128} autoComplete="new-password"
            className="text-right" dir="ltr" />
        </div>

        <Button type="submit"
          className="w-full bg-construction-primary hover:bg-construction-secondary text-white"
          disabled={loading}>
          {loading ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">لديك حساب بالفعل؟ </span>
          <button type="button" onClick={onSwitchToLogin}
            className="text-sm text-construction-primary hover:underline font-medium">
            تسجيل الدخول
          </button>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignupForm;
