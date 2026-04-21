import React, { useState, useEffect, useRef } from 'react';
import { Bot, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatbotPopover from './chatbot/ChatbotPopover';

// Brand colors:
//   navy  #030957 → hsl(234 93% 18%)
//   gold  #FFB900 → hsl(43 100% 50%)
const ChatbotFloatingButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {/* Popover above the button */}
      {open && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-200 origin-bottom-right">
          <ChatbotPopover onClose={() => setOpen(false)} />
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'إغلاق عزبوت' : 'افتح عزبوت - المساعد الذكي'}
        aria-expanded={open}
        className={cn(
          'group flex items-center gap-2 rtl:flex-row-reverse self-start',
          'bg-[hsl(234_93%_18%)] text-white',
          'shadow-2xl hover:shadow-[hsl(43_100%_50%/0.45)]',
          'rounded-full pl-4 pr-3 py-3',
          'transition-all duration-300 hover:scale-105',
          'border border-[hsl(43_100%_50%/0.4)]'
        )}
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(43_100%_50%)]">
          {open ? (
            <X className="h-5 w-5 text-[hsl(234_93%_18%)]" />
          ) : (
            <Bot className="h-5 w-5 text-[hsl(234_93%_18%)]" />
          )}
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[hsl(234_93%_18%)]" />
          )}
        </span>
        <span className="hidden sm:inline-block font-bold text-sm whitespace-nowrap">
          {open ? 'إغلاق' : 'تحدث مع عزبوت'}
        </span>
      </button>
    </div>
  );
};

export default ChatbotFloatingButton;
