import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatbotFloatingButton: React.FC = () => {
  const location = useLocation();
  // إخفاء الزر داخل صفحة الشات بوت نفسها
  if (location.pathname.startsWith('/chatbot')) return null;

  return (
    <Link
      to="/chatbot"
      aria-label="افتح عزبوت - المساعد الذكي"
      className={cn(
        'fixed bottom-6 left-6 z-[60] group',
        'flex items-center gap-2 rtl:flex-row-reverse',
        'bg-primary text-primary-foreground',
        'shadow-2xl hover:shadow-primary/40',
        'rounded-full pl-4 pr-3 py-3',
        'transition-all duration-300 hover:scale-105',
        'animate-pulse-slow'
      )}
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15">
        <Bot className="h-5 w-5" />
        <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-primary" />
      </span>
      <span className="hidden sm:inline-block font-bold text-sm whitespace-nowrap">
        تحدث مع عزبوت
      </span>
    </Link>
  );
};

export default ChatbotFloatingButton;
