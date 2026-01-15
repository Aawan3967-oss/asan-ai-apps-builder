import Mustache from 'mustache';

export function renderTemplate({ title, aiRes, type }: { title: string; aiRes: string; type: string }) {
  const template = `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>{{title}}</title>
    <link rel="manifest" href="/manifest.json" />
    <style>
      body{font-family:Inter,Arial;margin:0;padding:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#071428;color:#e6eef8}
      .card{max-width:900px;padding:28px;border-radius:12px;background:linear-gradient(180deg,#071733,#021025);box-shadow:0 8px 30px rgba(0,0,0,0.6)}
      h1{margin:0 0 8px 0}
      p{margin:6px 0;color:#cbe3ff}
      ul{color:#9fc4ee}
    </style>
  </head>
  <body>
    <div class="card">
      <h1>{{title}}</h1>
      <div>{{{aiResHtml}}}</div>
    </div>
  </body>
  </html>`;
  const aiResHtml = aiRes.replace(/\n/g, '<br/>');
  return Mustache.render(template, { title, aiResHtml, type });
}
