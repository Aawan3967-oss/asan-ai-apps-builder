import { callAI } from '../lib/ai';
import { renderTemplate } from '../lib/templates';
import { writeStatus } from './store';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

type Input = { id: string; title: string; type: string; keywords?: string[] };

export async function generateSite(input: Input) {
  const { id, title, type, keywords } = input;
  await writeStatus(id, { status: 'generating' });

  // 1) Ask AI for copy / brand name suggestions (simple)
  const prompt = `Generate short hero title, subtitle, and 3 bullet features for a ${type} named "${title}" with keywords ${keywords?.join(', ')}`;
  const aiRes = await callAI(prompt);

  // 2) Render HTML using template + aiRes
  const html = renderTemplate({ title, aiRes, type });

  // 3) Write to disk (simple preview)
  const outDir = path.join(process.cwd(), '.ai_projects', id);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

  // 4) Create a simple manifest.json for PWA
  const manifest = {
    name: title,
    short_name: title.slice(0, 12),
    start_url: '.',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e90ff'
  };
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  // 5) Zip artifact
  const zipPath = path.join(process.cwd(), '.ai_projects', `${id}.zip`);
  await zipDirectory(outDir, zipPath);

  const previewUrl = `/ai_preview/${id}/index.html`; // simple local preview route via static serve (not implemented) — adjust when deploying
  const artifactUrl = `/api/artifact/${id}`; // not implemented in MVP; consumer will replace with S3 URL in production

  await writeStatus(id, { status: 'done', previewUrl, artifactUrl, path: outDir });
  return { previewUrl, artifactUrl };
}

async function zipDirectory(source: string, out: string) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);
  return new Promise<void>((resolve, reject) => {
    archive.directory(source, false).on('error', err => reject(err)).pipe(stream);
    stream.on('close', () => resolve());
    archive.finalize();
  });
}
