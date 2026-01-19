import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Bot, Chrome, Sparkles, LogOut, Send, Paperclip, Mic, Facebook, Twitter } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
  const [chat, setChat] = useState<{role: string, content: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!session) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
        {/* فینسی ویب سائٹ لوگو */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #2563eb, #9333ea)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(37,99,235,0.4)', margin: '0 auto 20px', transform: 'rotate(12deg)' }}>
            <Bot size={60} color="white" />
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', margin: 0 }}>ASAN AI</h1>
          <p style={{ color: '#555', marginTop: '10px', fontSize: '1.1rem' }}>جدید ترین AI اب اردو میں بھی</p>
        </div>

        {/* فینسی لاگ ان کارڈ */}
        <div style={{ backgroundColor: '#111', padding: '35px', borderRadius: '40px', border: '1px solid #222', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button onClick={() => signIn('google')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: 'white', color: 'black', padding: '16px', borderRadius: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem', transition: '0.3s' }}>
              <Chrome size={20} /> Continue with Google
            </button>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#1877F2', color: 'white', padding: '16px', borderRadius: '18px', fontWeight: 'bold', border: 'none', cursor: 'not-allowed', opacity: 0.5 }}>
              <Facebook size={20} /> Continue with Facebook
            </button>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#1DA1F2', color: 'white', padding: '16px', borderRadius: '18px', fontWeight: 'bold', border: 'none', cursor: 'not-allowed', opacity: 0.5 }}>
              <Twitter size={20} /> Continue with Twitter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '20px 30px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '900', fontSize: '1.6rem', color: '#3b82f6' }}>
            <Sparkles size={24} /> ASAN AI
          </div>
          <button onClick={() => signOut()} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px hover:color-red-500' }}>
            <LogOut size={20} /> سائن آؤٹ
          </button>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {chat.length === 0 && (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.05, fontSize: '5rem', fontWeight: 'bold', textAlign: 'center' }}>
              How can I help you?
            </div>
          )}
          {/* چیٹ کا مواد یہاں رینڈر ہوگا */}
        </main>

        <div style={{ padding: '20px 40px', background: 'linear-gradient(transparent, black)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#111', padding: '10px 20px', borderRadius: '25px', border: '1px solid #333 shadow-2xl' }}>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
            <button onClick={() => fileInputRef.current?.click()} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><Paperclip size={22} /></button>
            <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><Mic size={22} /></button>
            <input placeholder="ASAN AI سے کچھ بھی پوچھیں..." style={{ flex: 1, background: 'none', border: 'none', color: 'white', outline: 'none', padding: '10px', fontSize: '1rem' }} />
            <button style={{ backgroundColor: 'white', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
