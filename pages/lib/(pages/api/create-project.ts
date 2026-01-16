import type { NextApiRequest, NextApiResponse } from 'next';
import { generateUniversalCode } from '../../lib/ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { prompt } = req.body;
    const code = await generateUniversalCode(prompt);
    res.status(200).json({ code });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
