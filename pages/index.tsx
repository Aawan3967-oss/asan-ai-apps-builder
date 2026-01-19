import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Mic, Paperclip, Send, LogOut, Bot, Sparkles, Image as ImageIcon } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        <Bot size={60} className="mb-4 text-blue-500 animate-pulse" />
        <h1 className="text-4xl font-bold mb-6">Asan AI 🚀</h1>
        <button onClick={() => signIn('google')} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all">
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white">
      <header className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-400">
          <Sparkles size={24} /> Asan AI
        </div>
        <button onClick={() => signOut()} className="text-gray-400 hover:text-white"><LogOut /></button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <h2 className="text-4xl font-bold opacity-20">How can I help you today?</h2>
          </div>
        )}
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800 border border-gray-700'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </main>

      <div className="p-4 bg-black border-t border-gray-800">
        <form onSubmit={sendMessage} className="max-w-3xl mx-auto relative flex items-center gap-2 bg-[#1a1a1a] rounded-2xl p-2 border border-gray-700 focus-within:border-blue-500 transition-all">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-700 rounded-xl text-gray-400">
            <Paperclip size={20} />
          </button>
          <button type="button" className="p-2 hover:bg-gray-700 rounded-xl text-gray-400">
            <Mic size={20} />
          </button>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Asan AI..." 
            className="flex-1 bg-transparent p-2 outline-none"
          />
          <button type="submit" className="p-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
