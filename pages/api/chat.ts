export default async function handler(req: any, res: any) {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY; // یہ وہی چابی ہے جو آپ نے ورسل میں ڈالی ہے

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    
    const data = await response.json();
    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ text: aiText });
  } catch (error) {
    res.status(500).json({ text: "سرور میں خرابی ہے۔" });
  }
}
