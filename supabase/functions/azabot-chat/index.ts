import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const MAINTENANCE_API_KEY = Deno.env.get("MAINTENANCE_GATEWAY_API_KEY") ?? "0639988287e667c4c7801e34065105f3b80303c6d8d3c2f6dfee45cc7314aebe";
const MAINTENANCE_BASE_URL = "https://zrrffsjbfkphridqyais.supabase.co/functions/v1";

const SYSTEM_PROMPT = `أنت "عزبوت" (AzaBot)، المساعد الذكي الرسمي لـ"العزب للمقاولات والتشطيبات".

شخصيتك:
- ودود ومحترف، تتحدث بالعربية الفصحى المبسطة بلهجة مهذبة.
- خبير في خدمات الشركة: التشطيبات الفاخرة، الهوية البصرية، التوريدات العامة، خدمة UberFix للصيانة السريعة.
- موجز ومباشر.

معلومات:
- الاسم: العزب للمقاولات والتشطيبات
- الخدمات: تشطيبات فاخرة، إدارة مشاريع، توريدات، صيانة (UberFix)، هوية بصرية.
- الفروع: القاهرة (الرئيسي)، الإسكندرية، تغطية معظم المحافظات.

🔧 **أدوات الصيانة (مهم جداً)**:
لديك أداتان فعليتان:
1. **create_maintenance_request**: لإنشاء طلب صيانة جديد. اطلب من العميل: الاسم، رقم الهاتف، نوع الخدمة (plumbing/electrical/ac/painting/carpentry/general)، وصف المشكلة، الأولوية (low/medium/high). لا تستدعها قبل جمع كل الحقول الإلزامية.
2. **query_maintenance_request**: للاستعلام عن طلب موجود برقم الطلب (MR-25-XXXXX) أو رقم هاتف العميل.

عند طلب الصيانة: اجمع البيانات في حوار قصير ثم استدعِ الأداة. عند نجاح الإنشاء أبلغ العميل برقم الطلب بوضوح.

استخدم Markdown البسيط للتنسيق.`;

const TOOLS = [
  {
    type: "function",
    function: {
      name: "create_maintenance_request",
      description: "إنشاء طلب صيانة جديد في نظام العزب. استخدمها فقط بعد جمع كل الحقول الإلزامية من العميل.",
      parameters: {
        type: "object",
        properties: {
          client_name: { type: "string", description: "اسم العميل الكامل" },
          client_phone: { type: "string", description: "رقم هاتف مصري (01xxxxxxxxx)" },
          service_type: {
            type: "string",
            enum: ["plumbing", "electrical", "ac", "painting", "carpentry", "general"],
            description: "نوع الخدمة المطلوبة",
          },
          description: { type: "string", description: "وصف تفصيلي للمشكلة" },
          priority: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "أولوية الطلب",
          },
        },
        required: ["client_name", "client_phone", "service_type", "description", "priority"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "query_maintenance_request",
      description: "الاستعلام عن طلب صيانة موجود برقم الطلب أو رقم الهاتف.",
      parameters: {
        type: "object",
        properties: {
          request_number: { type: "string", description: "رقم الطلب مثل MR-25-00042" },
          client_phone: { type: "string", description: "رقم هاتف العميل" },
        },
        additionalProperties: false,
      },
    },
  },
];

async function executeTool(name: string, args: Record<string, unknown>): Promise<string> {
  try {
    if (name === "create_maintenance_request") {
      const r = await fetch(`${MAINTENANCE_BASE_URL}/maintenance-gateway`, {
        method: "POST",
        headers: {
          "x-api-key": MAINTENANCE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channel: "azabot", ...args }),
      });
      const data = await r.json();
      if (!r.ok) return JSON.stringify({ ok: false, status: r.status, error: data });
      return JSON.stringify({ ok: true, ...data });
    }
    if (name === "query_maintenance_request") {
      const params = new URLSearchParams();
      if (args.request_number) params.set("request_number", String(args.request_number));
      if (args.client_phone) params.set("client_phone", String(args.client_phone));
      if (![...params.keys()].length) {
        return JSON.stringify({ ok: false, error: "request_number أو client_phone مطلوب" });
      }
      const r = await fetch(`${MAINTENANCE_BASE_URL}/query-maintenance-requests?${params}`, {
        headers: { "x-api-key": MAINTENANCE_API_KEY },
      });
      const data = await r.json();
      if (!r.ok) return JSON.stringify({ ok: false, status: r.status, error: data });
      return JSON.stringify({ ok: true, ...data });
    }
    return JSON.stringify({ ok: false, error: `أداة غير معروفة: ${name}` });
  } catch (e) {
    return JSON.stringify({ ok: false, error: (e as Error).message });
  }
}

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

    const convo: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    for (let round = 0; round < 4; round++) {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: convo,
          tools: TOOLS,
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
      const msg = data.choices?.[0]?.message;
      const toolCalls = msg?.tool_calls;

      if (!toolCalls || toolCalls.length === 0) {
        return new Response(JSON.stringify({ reply: msg?.content ?? "" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      convo.push(msg);
      for (const tc of toolCalls) {
        let args: Record<string, unknown> = {};
        try { args = JSON.parse(tc.function?.arguments ?? "{}"); } catch { /* ignore */ }
        const result = await executeTool(tc.function?.name, args);
        convo.push({
          role: "tool",
          tool_call_id: tc.id,
          content: result,
        });
      }
    }

    return new Response(JSON.stringify({ reply: "تعذّر إكمال العملية، حاول مجدداً." }), {
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
