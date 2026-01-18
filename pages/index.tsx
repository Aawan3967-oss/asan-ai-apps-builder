import { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState('ur');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userLang = typeof window !== 'undefined' ? navigator.language : 'ur';
    setLanguage(userLang.startsWith('en') ? 'en' : 'ur');
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    const newMsgs = [...messages, { role: 'user', text: prompt }];
    setMessages(newMsgs);
    setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setMessages([...newMsgs, { role: 'ai', text: data.text || "AI جواب نہیں دے سکا۔" }]);
    } catch (error) {
      setMessages([...newMsgs, { role: 'ai', text: "کنکشن کا مسئلہ ہے۔" }]);
    } finally {
      setLoading(false);
    }
  };

  const uiText: any = {
    ur: { new: "+ نئی چیٹ", upgrade: "پلان اپ گریڈ 💎", login: "گوگل سے لاگ ان", history: "حالیہ گفتگو", settings: "ترمیمات ⚙️", logout: "لاگ آؤٹ", place: "میسج لکھیں...", head: "میں آپ کی کیا مدد کر سکتا ہوں؟" },
    en: { new: "+ New Chat", upgrade: "Upgrade Plan 💎", login: "Sign in with Google", history: "History", settings: "Settings ⚙️", logout: "Logout", place: "Message Asan AI...", head: "How can I help you today?" }
  };
  const t = uiText[language] || uiText.ur;

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#212121', color: '#fff', direction: language === 'ur' ? 'rtl' : 'ltr', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* سائیڈ بار */}
      <div style={{ width: isSidebarOpen ? '280px' : '0', transition: '0.3s', backgroundColor: '#171717', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: language === 'ur' ? '1px solid #333' : 'none' }}>
        <div style={{ padding: '15px', flex: 1 }}>
          <button style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #424242', background: 'transparent', color: '#fff', cursor: 'pointer', marginBottom: '20px' }}>{t.new}</button>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>{t.history}</div>
          {messages.slice(0, 5).map((m, i) => (
            <div key={i} style={{ padding: '8px', fontSize: '13px', color: '#ccc', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🗨️ {m.text.substring(0, 20)}...</div>
          ))}
        </div>
        
        <div style={{ padding: '15px', borderTop: '1px solid #333', backgroundColor: '#000' }}>
          {!session ? (
            <button onClick={() => signIn('google')} style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#fff', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
              {t.login}
            </button>
          ) : (
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={session.user?.image || ''} style={{ width: '30px', borderRadius: '50%' }} />
              <span style={{ fontSize: '14px' }}>{session.user?.name}</span>
              <button onClick={() => signOut()} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '12px' }}>{t.logout}</button>
            </div>
          )}
          <Link href="/pricing" style={{ textDecoration: 'none', color: '#fff' }}>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}><span>💎</span> {t.upgrade}</div>
          </Link>
          <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#b4b4b4' }}><span>⚙️</span> {t.settings}</div>
        </div>
      </div>

      {/* مین ایریا */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #2d2d30' }}>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>☰</button>
          <span style={{ fontWeight: 'bold' }}>Asan AI 🚀</span>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '25vh' }}>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 'bold' }}>{t.head}</h2>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} style={{ padding: '25px 15%', backgroundColor: msg.role === 'user' ? 'transparent' : '#2f2f2f', borderBottom: '1px solid #2d2d30' }}>
                <div style={{ maxWidth: '800px', margin: 'auto', display: 'flex', gap: '25px' }}>
                  <div style={{ fontSize: '24px' }}>{msg.role === 'user' ? '👤' : '🤖'}</div>
                  <div style={{ lineHeight: '1.8', fontSize: '17px', color: '#ececec', whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 15%', background: 'linear-gradient(transparent, #212121 50%)' }}>
          <div style={{ position: 'relative', maxWidth: '800px', margin: 'auto' }}>
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder={t.place} style={{ width: '100%', padding: '16px 20px', borderRadius: '15px', backgroundColor: '#2f2f2f', border: '1px solid #424242', color: '#fff', fontSize: '16px', outline: 'none' }} />
            <button onClick={sendMessage} style={{ position: 'absolute', [language === 'ur' ? 'left' : 'right']: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: loading ? '#555' : '#10a37f', color: '#fff', border: 'none', width: '35px', height: '35px', borderRadius: '8px', cursor: 'pointer' }}>↑</button>
          </div>
        </div>
      </div>
    </div>
  );
}
