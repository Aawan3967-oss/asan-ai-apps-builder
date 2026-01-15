import type { NextApiRequest, NextApiResponse } from 'next';
import { readStatus } from '../../../server/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'missing id' });
  const status = await readStatus(id);
  if (!status) return res.status(404).json({ error: 'not found' });
  res.status(200).json(status);
}
