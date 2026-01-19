import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Mic, Paperclip, Send, LogOut, Bot, Sparkles } from 'lucide-react';

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

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newChat }),
    });
    const data = await res.json();
    setChat([...newChat, { role: 'assistant', content: data.content }]);
  };

  if (!session) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <Bot size={70} color="#3b82f6" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Asan AI 🚀</h1>
        <button onClick={() => signIn('google')} style={{ marginTop: '30px', backgroundColor: 'white', color: 'black', padding: '12px 35px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <header style={{ padding: '15px 25px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.4rem', color: '#3b82f6' }}>
            <Sparkles /> Asan AI
          </div>
          <button onClick={() => signOut()} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><LogOut size={20} /></button>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {chat.map((msg, i) => (
            <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '12px 18px', borderRadius: '15px', backgroundColor: msg.role === 'user' ? '#2563eb' : '#1a1a1a', border: msg.role === 'user' ? 'none' : '1px solid #333' }}>
              {msg.content}
            </div>
          ))}
        </main>

        <div style={{ padding: '20px', backgroundColor: '#000' }}>
          <form onSubmit={sendMessage} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#111', padding: '8px 15px',
