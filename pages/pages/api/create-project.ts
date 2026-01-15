import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    // یہاں AI انٹیگریشن ہوگی
    res.status(200).json({ message: 'پراجیکٹ کامیابی سے شروع کر دیا گیا ہے', id: '123' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
