```markdown
# AI Site / PWA Generator — MVP

مقصد:
ایک سادہ، کم مینٹیننس والا MVP جو صارف کیلئے landing page/PWA خود جنریٹ کرے۔

اہم نقاط:
- Tech: Next.js + TypeScript
- AI adapter: `lib/ai.ts` (OpenAI یا Replicate کے لیے placeholders)
- Deploy recommendations: Vercel (free tier) یا Cloudflare Pages
- Env vars required: `OPENAI_API_KEY` یا `REPLICATE_API_TOKEN`, `NEXT_PUBLIC_SITE_URL` (جب deploy کریں)

فائلز:
- pages/index.tsx — UI wizard (create project)
- pages/api/create-project — queues generation + returns project id (simple sync in MVP)
- pages/api/status/[id] — returns status and preview link
- lib/templates.ts — small set of templates (HTML/CSS)
- lib/ai.ts — AI abstraction (prompts + calls)

شروع کیسے کریں (local):
1. npm install
2. env میں اپنی AI key ڈالیں:
   - `export OPENAI_API_KEY="sk_..."` یا `export REPLICATE_API_TOKEN="..."`
3. npm run dev
4. لوکل UI پر جائیں: http://localhost:3000

نوٹس:
- یہ scaffold MVP ہے — production میں آپ کو sandboxed build workers، vulnerability scans، اور domain provision integration شامل کرنا ہوگا۔
- Domain auto-provision: مستقبل کے کام میں شامل کریں گے (Cloudflare / Route53 API)
```
