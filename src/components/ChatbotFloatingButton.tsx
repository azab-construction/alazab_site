import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatbotDialog from './chatbot/ChatbotDialog';

// Brand colors per spec:
//   navy  #030957 → hsl(234 93% 18%)
//   gold  #FFB900 → hsl(43 100% 50%)
const ChatbotFloatingButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="افتح عزبوت - المساعد الذكي"
        className={cn(
          'fixed bottom-6 left-6 z-[60] group',
          'flex items-center gap-2 rtl:flex-row-reverse',
          'bg-[hsl(234_93%_18%)] text-white',
          'shadow-2xl hover:shadow-[hsl(43_100%_50%/0.45)]',
          'rounded-full pl-4 pr-3 py-3',
          'transition-all duration-300 hover:scale-105',
          'border border-[hsl(43_100%_50%/0.4)]'
        )}
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(43_100%_50%)]">
          <Bot className="h-5 w-5 text-[hsl(234_93%_18%)]" />
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[hsl(234_93%_18%)]" />
        </span>
        <span className="hidden sm:inline-block font-bold text-sm whitespace-nowrap">
          تحدث مع عزبوت
        </span>
      </button>

      <ChatbotDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default ChatbotFloatingButton;
