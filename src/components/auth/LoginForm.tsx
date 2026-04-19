import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AuthCard from './AuthCard';
import { loginSchema } from '@/lib/validation';
import { getSafeErrorMessage } from '@/utils/errorHandler';
import { sanitizeInput } from '@/utils/security';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToReset: () => void;
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onSwitchToReset, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse({
      email: sanitizeInput(email),
      password,
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
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });

      if (error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: getSafeErrorMessage(error, "البريد الإلكتروني أو كلمة المرور غير صحيحة"),
          variant: "destructive",
        });
      } else {
        toast({ title: "تم تسجيل الدخول بنجاح", description: "مرحباً بك مرة أخرى!" });
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
    <AuthCard title="تسجيل الدخول">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            autoComplete="email"
            className="text-right"
            dir="ltr"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={128}
            autoComplete="current-password"
            className="text-right"
            dir="ltr"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-construction-primary hover:bg-construction-secondary text-white"
          disabled={loading}
        >
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>

        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={onSwitchToReset}
            className="text-sm text-construction-primary hover:underline"
          >
            نسيت كلمة المرور؟
          </button>
          <div>
            <span className="text-sm text-gray-600">ليس لديك حساب؟ </span>
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-sm text-construction-primary hover:underline font-medium"
            >
              إنشاء حساب جديد
            </button>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
