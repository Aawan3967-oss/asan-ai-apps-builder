import type { NextApiRequest, NextApiResponse } from 'next';
import { generateUniversalCode } from '../../lib/ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    // یہاں ہم اپنے نئے فری جنریٹر کو کال کر رہے ہیں
    const generatedCode = await generateUniversalCode(prompt);
    
    res.status(200).json({ code: generatedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate code' });
  }
}
