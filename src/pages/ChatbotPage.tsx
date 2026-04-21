import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import ChatbotDialog from '@/components/chatbot/ChatbotDialog';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

// The chatbot is now a popup. This page exists for legacy links and
// auto-opens the popup, then keeps a button to reopen it.
const ChatbotPage: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <PageLayout title="عزبوت — المساعد الذكي">
      <div className="max-w-md mx-auto text-center py-16" dir="rtl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(43_100%_50%)] flex items-center justify-center">
          <Bot className="h-8 w-8 text-[hsl(234_93%_18%)]" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">تحدث مع عزبوت</h2>
        <p className="text-muted-foreground mb-6">
          المحادثة الآن في نافذة منبثقة. اضغط الزر بالأسفل لفتحها في أي وقت.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => setOpen(true)}
            className="bg-[hsl(234_93%_18%)] hover:bg-[hsl(234_93%_22%)] text-white"
          >
            افتح المحادثة
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </div>

      <ChatbotDialog open={open} onOpenChange={setOpen} />
    </PageLayout>
  );
};

export default ChatbotPage;
