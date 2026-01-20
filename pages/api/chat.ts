import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });
  try {
    const { messages } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });
    res.status(200).json({ content: completion.choices[0].message.content });
  } catch (error: any) {
    res.status(500).json({ error: "AI سروس فی الحال دستیاب نہیں ہے۔" });
  }
}
