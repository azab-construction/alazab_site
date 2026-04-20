import React, { useState, useRef, useEffect, useCallback } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, X, MessageSquare, Mic, Phone, Keyboard, ChevronDown, Volume2, Headphones } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/integrations/supabase/client';
import { useConversation } from '@elevenlabs/react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  'ما هي خدمات الشركة؟',
  'أريد عرض سعر تشطيب',
  'ما هي أسعار التشطيبات؟',
  'ما هي فروع الشركة؟',
];

const ELEVENLABS_AGENT_ID = ''; // ضع agent_id الخاص بـ ElevenLabs هنا لتفعيل المحادثة الصوتية الحقيقية

const ChatbotPage: React.FC = () => {
  const [tab, setTab] = useState<'text' | 'voice'>('text');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceConnecting, setVoiceConnecting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onConnect: () => toast({ title: 'متصل', description: 'بدأت المحادثة الصوتية مع عزبوت' }),
    onDisconnect: () => toast({ title: 'انتهت المحادثة' }),
    onError: (e) => toast({ variant: 'destructive', title: 'خطأ', description: String(e) }),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('azabot-chat', {
        body: { messages: next.map(({ role, content }) => ({ role, content })) },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: data.reply || '...' },
      ]);
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'تعذّر الرد', description: err?.message ?? 'حدث خطأ' });
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: 'عذراً، حدث خطأ مؤقت. حاول مرة أخرى.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const startVoice = useCallback(async () => {
    if (!ELEVENLABS_AGENT_ID) {
      toast({
        variant: 'destructive',
        title: 'لم يُهيأ الوكيل الصوتي',
        description: 'يرجى إضافة ElevenLabs Agent ID في صفحة ChatbotPage.',
      });
      return;
    }
    setVoiceConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const { data, error } = await supabase.functions.invoke('elevenlabs-voice-token', {
        body: { agentId: ELEVENLABS_AGENT_ID },
      });
      if (error || !data?.token) throw new Error(data?.error || 'فشل جلب التوكن');

      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'تعذّر الاتصال الصوتي', description: err?.message ?? 'حدث خطأ' });
    } finally {
      setVoiceConnecting(false);
    }
  }, [conversation]);

  const stopVoice = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isVoiceConnected = conversation.status === 'connected';

  return (
    <PageLayout title="عزبوت — المساعد الذكي">
      <div className="max-w-md mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-border bg-card" dir="rtl">
          {/* Header */}
          <div className="bg-[hsl(220_15%_12%)] text-white px-4 py-3 flex items-center justify-between">
            <button className="p-1 rounded-full hover:bg-white/10 transition" aria-label="إغلاق">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="font-bold text-sm leading-tight">
                  عزبوت <span className="text-primary">(AzaBot)</span>
                </p>
                <p className="text-[11px] text-white/70 flex items-center justify-end gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  المساعد الذكي - متصل الآن
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[hsl(220_15%_12%)] flex">
            <button
              onClick={() => setTab('voice')}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition relative',
                tab === 'voice' ? 'text-primary' : 'text-white/60 hover:text-white/90'
              )}
            >
              <Mic className="h-4 w-4" />
              محادثة صوتية
              {tab === 'voice' && <span className="absolute bottom-0 inset-x-4 h-0.5 bg-primary rounded-t" />}
            </button>
            <button
              onClick={() => setTab('text')}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition relative',
                tab === 'text' ? 'text-primary' : 'text-white/60 hover:text-white/90'
              )}
            >
              <MessageSquare className="h-4 w-4" />
              محادثة نصية
              {tab === 'text' && <span className="absolute bottom-0 inset-x-4 h-0.5 bg-primary rounded-t" />}
            </button>
          </div>

          {/* Body */}
          {tab === 'text' ? (
            <div className="bg-background flex flex-col h-[480px]">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-6">
                    <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-bold text-foreground mb-1">مرحباً! أنا عزبوت 👋</p>
                    <p className="text-sm text-muted-foreground mb-5">كيف بمكنني مساعدتك؟</p>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {QUICK_PROMPTS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-xs px-3 py-2 rounded-full border border-border bg-card hover:bg-accent hover:border-primary/50 text-foreground transition"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-start' : 'justify-end')}>
                      <div
                        className={cn(
                          'max-w-[80%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed',
                          m.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted text-foreground rounded-bl-md'
                        )}
                      >
                        {m.role === 'assistant' ? (
                          <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 dark:prose-invert">
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                          </div>
                        ) : (
                          m.content
                        )}
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex justify-end">
                    <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-bl-md flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border p-3 bg-card">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="text-primary shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="اكتب رسالتك..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                    disabled={loading}
                    className="border-0 bg-transparent focus-visible:ring-0 text-right"
                  />
                </div>
                <p className="text-[10px] text-center text-muted-foreground mt-2">
                  مدعوم بالذكاء الاصطناعي · قد يخطئ أحياناً
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-background flex flex-col h-[480px]">
              {/* Voice selector */}
              <div className="p-3">
                <button className="w-full flex items-center justify-between bg-muted px-4 py-3 rounded-xl text-sm">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">الصوت الأساسي · <span className="text-primary">عربي</span></span>
                    <Volume2 className="h-4 w-4 text-primary" />
                  </div>
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div
                  className={cn(
                    'w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all',
                    isVoiceConnected
                      ? 'bg-primary animate-pulse shadow-[0_0_40px_hsl(var(--primary)/0.5)]'
                      : 'bg-primary/15'
                  )}
                >
                  <Mic className={cn('h-9 w-9', isVoiceConnected ? 'text-primary-foreground' : 'text-primary')} />
                </div>
                <p className="font-bold text-foreground mb-1">محادثة صوتية مع عزبوت</p>
                <p className="text-sm text-muted-foreground">
                  {isVoiceConnected
                    ? conversation.isSpeaking ? 'عزبوت يتحدث...' : 'جاري الاستماع...'
                    : 'اضغط على زر الاتصال لبدء المحادثة'}
                </p>
              </div>

              <div className="border-t border-border p-4 bg-card flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  خدمة العملاء
                </Button>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="rounded-full">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setTab('text')}>
                    <Keyboard className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={isVoiceConnected ? stopVoice : startVoice}
                    disabled={voiceConnecting}
                    className={cn(
                      'rounded-full',
                      isVoiceConnected ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
                    )}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          🔒 محادثاتك آمنة · مدعومة بـ Lovable AI
        </p>
      </div>
    </PageLayout>
  );
};

export default ChatbotPage;
