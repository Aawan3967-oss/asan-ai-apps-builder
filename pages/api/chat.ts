export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY; // ورسل کی سیٹنگز سے چابی اٹھائے گا

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      res.status(200).json({ text: data.candidates[0].content.parts[0].text });
    } else {
      res.status(500).json({ text: "AI جواب نہیں دے سکا، اپنی API Key چیک کریں۔" });
    }
  } catch (error) {
    res.status(500).json({ text: "سرور سے رابطہ ٹوٹ گیا ہے۔" });
  }
}
