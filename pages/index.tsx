import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      setMessages((prev) => [...prev, { role: 'ai', text: "Error: Could not connect to server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff', color: '#ececec', fontFamily: 'sans-serif', direction: 'rtl' }}>
      
      {/* 1. Sidebar (سلائیڈر) */}
      <div style={{
        width: isSidebarOpen ? '260px' : '0',
        transition: 'width 0.3s ease',
        backgroundColor: '#202123',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div style={{ padding: '10px', flex: 1 }}>
          <button style={{ width: '100%', padding: '12px', border: '1px solid #4d4d4f', borderRadius: '5px', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer', textAlign: 'right', marginBottom: '10px' }}>
            + New Chat
          </button>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#666', fontSize: '12px', marginRight: '10px' }}>حالیہ چیٹس</p>
            {/* یہاں پرانی چیٹس کی لسٹ آ سکتی ہے */}
          </div>
        </div>

        {/* سلائیڈر کے نیچے قیمت کا بٹن */}
        <div style={{ padding: '15px', borderTop: '1px solid #4d4d4f' }}>
          <Link href="/pricing" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#343541', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>💎</span>
              <span>اپ گریڈ پلان (Pricing)</span>
            </div>
          </Link>
          <div style={{ marginTop: '10px', padding: '10px', color: '#999', fontSize: '14px' }}>👤 میرا اکاؤنٹ</div>
        </div>
      </div>

      {/* 2. Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#343541', position: 'relative' }}>
        
        {/* ٹاپ بار (مینیو بٹن کے ساتھ) */}
        <div style={{ padding: '10px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #2d2d30' }}>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', marginLeft: '15px' }}
          >
            ☰
          </button>
          <h1 style={{ fontSize: '16px', margin: 0, color: '#d1d1d1' }}>Asan AI Builder</h1>
        </div>

        {/* میسجز ڈسپلے */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '20vh', color: '#fff' }}>
              <h2 style={{ fontSize: '2rem' }}>میں آپ کی کیا مدد کر سکتا ہوں؟</h2>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              padding: '25px', 
              backgroundColor: msg.role === 'user' ? '#343541' : '#444654',
              display: 'flex',
              gap: '20px',
              borderBottom: '1px solid #2d2d30'
            }}>
              <div style={{ minWidth: '30px', fontWeight: 'bold' }}>{msg.role === 'user' ? '👤' : '🤖'}</div>
              <div style={{ fontSize: '16px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{msg.text}</div>
            </div>
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
