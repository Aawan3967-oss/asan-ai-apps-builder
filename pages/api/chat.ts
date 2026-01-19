import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { messages } = req.body;
    
    // GPT-4o ماڈل استعمال کریں جو تصاویر اور فائلز کو سمجھ سکتا ہے
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });

    res.status(200).json({ content: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "AI سے رابطہ کرنے میں مسئلہ ہوا۔" });
  }
}
