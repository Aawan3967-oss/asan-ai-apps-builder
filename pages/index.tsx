import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Mic, Paperclip, Send, LogOut, Bot, Sparkles, User } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{role: string, content: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newChat = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newChat }),
      });
      const data = await res.json();
      setChat([...newChat, { role: 'assistant', content: data.content || "معذرت، میں ابھی جواب نہیں دے سکتا۔" }]);
    } catch (error) {
      setChat([...newChat, { role: 'assistant', content: "API کنکشن کا مسئلہ ہے۔" }]);
    }
  };

  if (!session) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <Bot size={80} color="#3b82f6" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>Asan AI 🚀</h1>
        <p style={{ color: '#9ca3af', marginBottom: '30px' }}>آپ کا اپنا جدید ترین آرٹیفیشل انٹیلیجنس معاون</p>
        <button 
          onClick={() => signIn('google')} 
          style={{ backgroundColor: 'white', color: 'black', padding: '15px 40px', borderRadius: '50px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
        >
          Google کے ساتھ شروع کریں
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Main Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Header */}
        <header style={{ padding: '20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.5rem', color: '#3b82f6' }}>
            <Sparkles /> Asan AI
          </div>
          <button onClick={() => signOut()} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <LogOut size={20} /> سائن آؤٹ
          </button>
        </header>

        {/* Chat Area */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px', paddingBottom: '120px' }}>
          {chat.length === 0 && (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1, fontSize: '4rem', fontWeight: 'bold', textAlign: 'center' }}>
              میں آپ کی کیا مدد کر سکتا ہوں؟
            </div>
          )}
          {chat.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '20px' }}>
              <div style={{ maxWidth: '80%', padding: '15px', borderRadius: '20px', backgroundColor: msg.role === 'user' ? '#2563eb' : '#1a1a1a', border: msg.role === 'user' ? 'none' : '1px solid #333' }}>
                {msg.content}
              </div>
            </div>
          ))}
        </main>

        {/* Fancy Input Bar */}
        <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '20px', background: 'linear-gradient(transparent, black)' }}>
          <form onSubmit={sendMessage} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#222', padding: '10px', borderRadius: '20px', border: '1px solid #444' }}>
            
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
            
            <button type="button" onClick={() => fileInputRef.current?.click()} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: '10px' }}>
              <Paperclip size={24} />
            </button>

            <button type="button" style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: '10px' }}>
              <Mic size={24} />
            </button>

            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="اپنا پیغام یہاں لکھیں..." 
              style={{ flex: 1, background: 'none', border: 'none', color: 'white', outline: 'none', fontSize: '1rem' }}
            />

            <button type="submit" style={{ backgroundColor: 'white', color: 'black', border: 'none', padding: '12px', borderRadius: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
