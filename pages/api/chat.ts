import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });
  
  try {
    const { messages } = req.body;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    });
    const data = await response.json();
    res.status(200).json({ content: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ content: "معذرت، میں ابھی جواب نہیں دے پا رہا۔" });
  }
}
