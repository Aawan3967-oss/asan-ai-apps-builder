export async function generateSite(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("API Key نہیں ملی۔ براہ کرم Vercel کی سیٹنگز چیک کریں۔");
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional web developer. Return only high-quality HTML, CSS, and JS code." },
        { role: "user", content: `Create a professional landing page for: ${prompt}` }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
