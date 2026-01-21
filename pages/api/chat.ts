import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from 'next';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // آخری میسج نکالنا
    const userPrompt = messages[messages.length - 1].content;
    
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ content: text });
  } catch (error) {
    res.status(500).json({ content: "معذرت، ابھی جیمنی سروس سے رابطہ نہیں ہو پا رہا۔" });
  }
}
