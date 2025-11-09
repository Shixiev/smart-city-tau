import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `Сіз Smart Aktau жүйесінің AI көмекшісісіз. Сіздің атыңыз SmartAI. 
Сіз қала тұрғындарына келесі мәселелерде көмектесесіз:
- Қалалық оқиғалар мен жаңалықтар туралы ақпарат
- Экологиялық мәселелерді хабарлау
- Қызықты орындарды табу
- Қалалық қызметтерге қол жеткізу

Сіз достық, пайдалы және қысқа жауаптар берушісіз. Қазақ және орыс тілдерінде жауап бере аласыз.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Тым көп сұраныс. Біраз күте тұрыңыз.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI қызметі қолжетімсіз. Әкімшіге хабарласыңыз.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI қатесі');
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Кешіріңіз, жауап ала алмадым.';

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Chat AI error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Белгісіз қате' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
