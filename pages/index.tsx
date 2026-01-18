import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState('ur'); // ڈیفالٹ اردو
  const scrollRef = useRef<HTMLDivElement>(null);

  // آٹومیٹک زبان کی تبدیلی کا سسٹم
  useEffect(() => {
    const userLang = navigator.language || 'ur';
    if (userLang.startsWith('en')) setLanguage('en');
    else if (userLang.startsWith('ar')) setLanguage('ar');
    else setLanguage('ur');
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    const userMsg = { role: 'user', text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.text }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: "کنکشن کا مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔" }]);
    } finally {
      setLoading(false);
    }
  };

  // زبان کے حساب سے ٹیکسٹ
  const t: any = {
    ur: { newChat: "+ نئی چیٹ", upgrade: "اپ گریڈ پلان 💎", settings: "ترمیمات ⚙️", help: "مدد اور مددگار ❓", placeholder: "میسج لکھیں...", heading: "میں آپ کی کیا مدد کر سکتا ہوں؟" },
    en: { newChat: "+ New Chat", upgrade: "Upgrade Plan 💎", settings: "Settings ⚙️", help: "Help & FAQ ❓", placeholder: "Message Asan AI...", heading: "How can I help you today?" }
  };

  const curr = t[language] || t['ur'];

  return (
    <div style={{ 
      display: 'flex', height: '100vh', backgroundColor: '#212121', color: '#fff', 
      fontFamily: '"Noto Nastaliq Urdu", "Segoe UI", Tahoma, sans-serif', 
      direction: language === 'ur' ? 'rtl' : 'ltr' 
    }}>
      
      {/* 1. پروفیشنل سلائڈر (Sidebar) */}
      <div style={{
        width: isSidebarOpen ? '280px' : '0',
        transition: 'all 0.3s ease',
        backgroundColor: '#171717',
        display: 'flex', flexDirection: 'column',
        borderLeft: language === 'ur' ? '1px solid #333' : 'none',
        borderRight: language === 'en' ? '1px solid #333' : 'none',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '15px', flex: 1 }}>
          <button style={{ 
            width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #424242', 
            backgroundColor: 'transparent', color: '#fff', cursor: 'pointer', textAlign: 'right',
            fontSize: '15px', fontWeight: 'bold', marginBottom: '20px'
          }}>
            {curr.newChat}
          </button>
          
          <div style={{ color: '#b4b4b4', fontSize: '13px', padding: '10px' }}>حالیہ چیٹس (History)</div>
        </div>

        {/* سلائیڈر کے اضافی بٹن */}
        <div style={{ padding: '15px', backgroundColor: '#000' }}>
          <Link href="/pricing" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '5px', backgroundColor: '#2f2f2f' }}>
              <span>💎</span> <span>{curr.upgrade}</span>
            </div>
          </Link>
          <div style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#d1d1d1' }}>
            <span>⚙️</span> <span>{curr.settings}</span>
          </div>
          <div style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#d1d1d1' }}>
            <span>❓</span> <span>{curr.help}</span>
          </div>
        </div>
      </div>

      {/* 2. مین چیٹ ایریا */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* ٹاپ نیویگیشن */}
        <div style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>☰</button>
          <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#ececec' }}>Asan AI 🚀</div>
          <div style={{ width: '20px' }}></div>
        </div>

        {/* چیٹ ہسٹری */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '15vh' }}>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', opacity: 0.9 }}>{curr.heading}</h2>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              padding: '30px 15%', 
              backgroundColor: msg.role === 'user' ? 'transparent' : '#2f2f2f',
              lineHeight: '1.8', fontSize: '17px'
            }}>
              <div style={{ maxWidth: '800px', margin: 'auto', display: 'flex', gap: '20px' }}>
                <span style={{ fontSize: '20px' }}>{msg.role === 'user' ? '👤' : '🤖'}</span>
                <div style={{ whiteSpace: 'pre-wrap', color: '#ececec' }}>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ان پٹ باکس */}
        <div style={{ padding: '20px 15%', background: 'linear-gradient(transparent, #212121 70%)' }}>
          <div style={{ position: 'relative', maxWidth: '800px', margin: 'auto' }}>
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={curr.placeholder}
              style={{
                width: '100%', padding: '16px 20px', borderRadius: '15px',
                backgroundColor: '#2f2f2f', border: '1px solid #424242', color: '#fff',
                fontSize: '16px', outline: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
            />
            <button 
              onClick={sendMessage}
              style={{
                position: 'absolute', [language === 'ur' ? 'left' : 'right']: '12px', top: '50%', transform: 'translateY(-50%)',
                backgroundColor: loading ? '#555' : '#fff', color: '#000', border: 'none',
                width: '35px', height: '35px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              {loading ? '...' : '↑'}
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '11px', color: '#666', marginTop: '10px' }}>
            AI غلطی کر سکتا ہے۔ معلومات کی تصدیق کر لیں۔
          </p>
        </div>
      </div>
    </div>
  );
}            </div>
          ))}
        </div>

        {/* ان پٹ باکس (فلوٹنگ) */}
        <div style={{
          position: 'absolute', bottom: '0', left: '0', right: '0',
          padding: '20px', background: 'linear-gradient(transparent, #343541 50%)',
          display: 'flex', justifyContent: 'center'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Message Asan AI..."
              style={{
                width: '100%', padding: '14px 45px 14px 15px', borderRadius: '10px',
                backgroundColor: '#40414f', border: 'none', color: '#fff',
                boxShadow: '0 0 15px rgba(0,0,0,0.1)', outline: 'none'
              }}
            />
            <button 
              onClick={sendMessage}
              style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                background: loading ? '#666' : '#19c37d', color: '#fff', border: 'none',
                padding: '5px 10px', borderRadius: '5px', cursor: 'pointer'
              }}
            >
              {loading ? '...' : '↑'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
