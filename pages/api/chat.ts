import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages, modelType } = req.body; // اب ہم یہ بھی بتائیں گے کہ کون سا ماڈل استعمال کرنا ہے

  try {
    if (modelType === 'gemini') {
      // جیمنی کا استعمال
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = messages[messages.length - 1].content;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return res.status(200).json({ content: response.text() });
    } else {
      // اوپن اے آئی کا استعمال
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
      });
      return res.status(200).json({ content: completion.choices[0].message.content });
    }
  } catch (error: any) {
    res.status(500).json({ error: "AI سے رابطہ کرنے میں مسئلہ ہوا۔" });
  }
}
