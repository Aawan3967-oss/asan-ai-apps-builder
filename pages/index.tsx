import { useState, useEffect } from 'react';
import { Send, Sparkles, Bot, Zap, Cpu, Globe, Mic, Paperclip } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  // نوری نستعلیق فونٹ لوڈ کرنا
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: "معذرت، ابھی جیمنی سروس سے رابطہ نہیں ہو پا رہا۔" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#F8F7FF', 
      minHeight: '100vh', 
      fontFamily: "'Noto Nastaliq Urdu', serif", 
      direction: 'rtl', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      
      {/* --- فینسی ہیڈر --- */}
      <header style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(10px)', 
        padding: '15px 25px', 
        borderBottom: '2px solid #F3E8FF', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(124, 58, 237, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            background: 'linear-gradient(135deg, #7C3AED, #DB2777)', 
            borderRadius: '15px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)' 
          }}>
            <Cpu color="white" size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4C1D95', margin: 0, lineHeight: 1 }}>آسان AI</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#10B981', fontWeight: 'bold', marginTop: '5px' }}>
              <Globe size={12} /> سسٹم فعال ہے
            </div>
          </div>
        </div>
      </header>

      {/* --- چیٹ ایریا --- */}
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {messages.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5 }}>
            <Bot size={100} color="#DDD6FE" />
            <h2 style={{ fontSize: '30px', color: '#5B21B6', marginTop: '20px' }}>خوش آمدید!</h2>
            <p style={{ fontSize: '18px', color: '#7C3AED' }}>میں آج آپ کی کیا مدد کر سکتا ہوں؟</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            justifyContent: m.role === 'user' ? 'flex-start' : 'flex-end', 
            marginBottom: '25px' 
          }}>
            <div style={{ 
              maxWidth: '85%', 
              padding: '20px', 
              borderRadius: m.role === 'user' ? '30px 30px 0 30px' : '30px 30px 30px 0', 
              fontSize: '20px', 
              lineHeight: '2.4', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              backgroundColor: m.role === 'user' ? '#7C3AED' : 'white', 
              color: m.role === 'user' ? 'white' : '#1F2937',
              border: m.role === 'user' ? 'none' : '1px solid #F3E8FF'
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {/* --- گھومتا ہوا جدید لوگو (Loading) --- */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '40px', 
              border: '2px solid #F3E8FF', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '15px', 
              minWidth: '200px',
              boxShadow: '0 10px 30px rgba(124, 58, 237, 0.1)'
            }}>
              <div className="spinner-container" style={{ position: 'relative', width: '80px', height: '80px' }}>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  border: '6px solid #F3E8FF', 
                  borderRadius: '50%' 
                }}></div>
                <div className="spinner" style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  border: '6px solid transparent', 
                  borderTop: '6px solid #7C3AED', 
                  borderRadius: '50%' 
                }}></div>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Zap color="#7C3AED" size={30} className="pulse" />
                </div>
              </div>
              <span style={{ color: '#7C3AED', fontWeight: 'bold', fontSize: '18px' }}>آسان AI سوچ رہا ہے...</span>
            </div>
          </div>
        )}
      </main>

      {/* --- جدید ان پٹ ایریا --- */}
      <footer style={{ padding: '20px', backgroundColor: 'transparent' }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          backgroundColor: 'white', 
          padding: '10px 20px', 
          borderRadius: '100px', 
          boxShadow: '0 15px 50px rgba(124, 58, 237, 0.15)',
          border: '1px solid #F3E8FF'
        }}>
          <button style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer' }}><Paperclip size={26} /></button>
          
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اردو یا انگلش میں سوال لکھیں..."
            style={{ 
              flex: 1, 
              border: 'none', 
              outline: 'none', 
              fontSize: '20px', 
              padding: '15px', 
              backgroundColor: 'transparent',
              fontFamily: 'inherit'
            }}
          />

          <button style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', marginLeft: '10px' }}><Mic size={26} /></button>
          
          <button 
            onClick={sendMessage}
            style={{ 
              background: 'linear-gradient(135deg, #7C3AED, #DB2777)', 
              color: 'white', 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 5px 15px rgba(124, 58, 237, 0.4)',
              transition: 'transform 0.2s'
            }}
          >
            <Send size={26} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </footer>

      {/* اینیمیشن اسٹائلز */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
        
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
        .pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
