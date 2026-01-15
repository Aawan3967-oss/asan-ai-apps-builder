import React, { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string, opts?: any) =>
  fetch(url, opts).then(r => r.json());

export default function Home() {
  const [title, setTitle] = useState('My AI Landing');
  const [type_, setType] = useState('landing');
  const [keywords, setKeywords] = useState('startup,product');
  const [projectId, setProjectId] = useState<string | null>(null);

  const { data: status } = useSWR(
    projectId ? `/api/status/${projectId}` : null,
    fetcher,
    { refreshInterval: 3000 }
  );

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/create-project', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, type: type_, keywords: keywords.split(',').map(s => s.trim()) })
    });
    const json = await res.json();
    setProjectId(json.projectId);
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Create AI Landing / PWA</h1>
        <p className="small">فری، خودکار اور آسان — ایک کلک میں بنیاد بنے گی</p>
        <form onSubmit={handleCreate} style={{gap:12, display:'grid', marginTop:12}}>
          <label>Site Title<input value={title} onChange={e=>setTitle(e.target.value)} /></label>
          <label>Type
            <select value={type_} onChange={e=>setType(e.target.value)}>
              <option value="landing">Landing Page</option>
              <option value="blog">Blog</option>
              <option value="portfolio">Portfolio</option>
            </select>
          </label>
          <label>Keywords (comma separated)<input value={keywords} onChange={e=>setKeywords(e.target.value)} /></label>
          <div style={{display:'flex', gap:8}}>
            <button type="submit">Generate</button>
            <button type="button" onClick={()=>{ setTitle(''); setKeywords(''); }}>Reset</button>
          </div>
        </form>

        <div style={{marginTop:20}}>
          {projectId && (
            <>
              <p className="small">Project queued: <b>{projectId}</b></p>
              <p className="small">Status: {status?.status ?? 'waiting...'}</p>
              {status?.previewUrl && <p><a href={status.previewUrl} target="_blank" rel="noreferrer">Preview Site</a></p>}
              {status?.artifactUrl && <p><a href={status.artifactUrl} target="_blank" rel="noreferrer">Download ZIP / PWA</a></p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
