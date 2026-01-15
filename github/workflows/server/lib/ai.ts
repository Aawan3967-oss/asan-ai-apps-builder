/**
 * Simple AI adapter: supports OpenAI or a mock.
 * Set env AI_PROVIDER=openai and OPENAI_API_KEY in production.
 * For a self-hosted provider, extend this adapter.
 */
import fetch from 'isomorphic-unfetch';

export async function callAI(prompt: string) {
  const provider = process.env.AI_PROVIDER || 'mock';
  if (provider === 'openai') {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error('OPENAI_API_KEY missing');
    // Simple Chat Completions call (replace endpoint to match your chosen model)
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300
      })
    });
    const j = await res.json();
    return j?.choices?.[0]?.message?.content ?? JSON.stringify(j);
  } else {
    // Mock fallback (free, no key) — useful for local demo
    return `Hero: ${prompt.slice(0, 40)}...\nSubtitle: Auto-generated subtitle\nFeatures:\n- Fast\n- Simple\n- PWA ready`;
  }
}
