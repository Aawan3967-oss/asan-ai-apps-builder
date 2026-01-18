import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
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
    ur: { new: "+ نئی چیٹ", upgrade: "پلان اپ گریڈ 💎", explore: "ایکسپلور 🧭", history: "حالیہ گفتگو", settings: "ترمیمات ⚙️", help: "مدد ❓", place: "میسج لکھیں...", head: "میں آپ کی کیا مدد کر سکتا ہوں؟" },
    en: { new: "+ New Chat", upgrade: "Upgrade Plan 💎", explore: "Explore 🧭", history: "History", settings: "Settings ⚙️", help: "Help ❓", place: "Message Asan AI...", head: "How can I help you today?" }
  };
  const t = uiText[language] || uiText.ur;

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#212121', color: '#fff', direction: language === 'ur' ? 'rtl' : 'ltr', fontFamily: '"Noto Nastaliq Urdu", system-ui, sans-serif' }}>
      
      {/* 1. پروفیشنل سائیڈ بار */}
      <div style={{ width: isSidebarOpen ? '280px' : '0', transition: '0.3s', backgroundColor: '#171717', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: language === 'ur' ? '1px solid #333' : 'none', borderRight: language === 'en' ? '1px solid #333' : 'none' }}>
        <div style={{ padding: '15px', flex: 1 }}>
          <button style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #424242', background: 'transparent', color: '#fff', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold', fontSize: '15px' }}>{t.new}</button>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px', padding: '0 5px' }}>{t.history}</div>
          <div style={{ padding: '8px', fontSize: '14px', cursor: 'pointer', borderRadius: '5px', color: '#ececec', backgroundColor: '#2f2f2f' }}>📌 Asan AI Guide</div>
        </div>
        
        <div style={{ padding: '15px', borderTop: '1px solid #333' }}>
          <Link href="/pricing" style={{ textDecoration: 'none', color: '#fff' }}>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderRadius: '8px' }}><span>💎</span> {t.upgrade}</div>
          </Link>
          <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#b4b4b4' }}><span>🧭</span> {t.explore}</div>
          <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#b4b4b4' }}><span>⚙️</span> {t.settings}</div>
          <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#b4b4b4' }}><span>❓</span> {t.help}</div>
        </div>
      </div>

      {/* 2. مین چیٹ ایریا */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #2d2d30' }}>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>☰</button>
          <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#ececec' }}>Asan AI 🚀</span>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '25vh' }}>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 'bold', opacity: 0.9 }}>{t.head}</h2>
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

        {/* ان پٹ کنٹینر */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 15%', background: 'linear-gradient(transparent, #212121 50%)' }}>
          <div style={{ position: 'relative', maxWidth: '800px', margin: 'auto' }}>
            <input 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
              placeholder={t.place} 
              style={{ width: '100%', padding: '16px 20px', borderRadius: '15px', backgroundColor: '#2f2f2f', border: '1px solid #424242', color: '#fff', fontSize: '16px', outline: 'none', textAlign: language === 'ur' ? 'right' : 'left' }} 
            />
            <button 
              onClick={sendMessage} 
              style={{ position: 'absolute', [language === 'ur' ? 'left' : 'right']: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: loading ? '#555' : '#10a37f', color: '#fff', border: 'none', width: '35px', height: '35px', borderRadius: '8px', cursor: 'pointer' }}
            >
              {loading ? '...' : '↑'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}              onClick={sendMessage} 
              style={{ position: 'absolute', [language === 'ur' ? 'left' : 'right']: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: loading ? '#555' : '#fff', color: '#000', border: 'none', width: '35px', height: '35px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {loading ? '...' : '↑'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
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
