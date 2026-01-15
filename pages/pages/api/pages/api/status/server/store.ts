import fs from 'fs';
import path from 'path';
const DB_DIR = path.join(process.cwd(), '.ai_projects');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);

export async function writeStatus(id: string, data: any) {
  fs.writeFileSync(path.join(DB_DIR, `${id}.json`), JSON.stringify(data, null, 2));
}

export async function readStatus(id: string) {
  const p = path.join(DB_DIR, `${id}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
