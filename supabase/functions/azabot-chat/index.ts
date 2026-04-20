import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const SYSTEM_PROMPT = `أنت "عزبوت" (AzaBot)، المساعد الذكي الرسمي لشركة "العزب للمقاولات والتشطيبات".

شخصيتك:
- ودود ومحترف، تتحدث بالعربية الفصحى المبسطة بلهجة مهذبة.
- خبير في خدمات الشركة: التشطيبات الفاخرة، الهوية البصرية، التوريدات العامة، خدمة UberFix للصيانة السريعة.
- موجز ومباشر — لا تطيل الردود بدون داعٍ.

معلومات الشركة:
- الاسم: العزب للمقاولات والتشطيبات (لا تقل "شركة")
- الخدمات الأساسية: تشطيبات داخلية فاخرة، إدارة مشاريع، توريدات مواد بناء، صيانة شاملة (UberFix)، تصميم هوية بصرية للمحلات.
- الفروع: القاهرة (المقر الرئيسي)، الإسكندرية، ومناطق تشغيل تغطي معظم المحافظات.
- التواصل: عبر صفحة "اتصل بنا" في الموقع، أو طلب صيانة عبر /maintenance-request.

عند سؤالك عن الأسعار: أعطِ نطاقات تقريبية واطلب من المستخدم التواصل للحصول على عرض سعر دقيق.
استخدم Markdown البسيط (قوائم، **عريض**) لتنظيم الردود الطويلة.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY غير مهيأ");
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "تم تجاوز الحد المسموح، حاول لاحقاً." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "نفدت الرصيد. يرجى إضافة رصيد." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const txt = await response.text();
      throw new Error(`AI gateway error: ${response.status} ${txt}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("azabot-chat error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
