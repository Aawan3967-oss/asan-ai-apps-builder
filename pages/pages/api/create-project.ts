import type { NextApiRequest, NextApiResponse } from 'next';
import { generateSite } from '../../server/generator';
import { v4 as uuidv4 } from 'uuid';

type Body = {
  title: string;
  type: string;
  keywords?: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const body = req.body as Body;
  const id = uuidv4();
  // Simple synchronous generation for MVP (in production push to queue)
  try {
    // generateSite returns object with previewUrl and artifactUrl (could be local path)
    const result = await generateSite({ id, ...body });
    // save metadata to a simple JSON file or DB (omitted for brevity)
    // For demo, store to /tmp or in-memory (here we just return)
    res.status(200).json({ projectId: id, status: 'done', ...result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
