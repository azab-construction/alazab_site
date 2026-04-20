import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY غير مهيأ");
    }

    const { agentId } = await req.json().catch(() => ({}));
    if (!agentId || typeof agentId !== "string") {
      return new Response(JSON.stringify({ error: "agentId مطلوب" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`,
      { headers: { "xi-api-key": ELEVENLABS_API_KEY } }
    );

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`ElevenLabs token error: ${res.status} ${txt}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify({ token: data.token }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("elevenlabs-voice-token error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
