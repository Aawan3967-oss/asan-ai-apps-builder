import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Mic, Paperclip, Send, LogOut, Bot, Sparkles, Chrome, Facebook, Twitter, AlertCircle } from 'lucide-react';

export default function Home() {
  const { data: session, status } = useSession();
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{role: string, content: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (status === "loading") return <div className="h-screen bg-black flex items-center justify-center text-white">لوڈ ہو رہا ہے...</div>;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-6 font-sans">
        {/* فینسی لوگو */}
        <div className="mb-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.3)] mb-4 rotate-6 hover:rotate-0 transition-all duration-500">
            <Bot size={50} color="white" />
          </div>
          <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">ASAN AI</h1>
          <p className="text-gray-500 mt-2">آرٹیفیشل انٹیلیجنس اب سب کے لیے</p>
        </div>

        {/* لاگ ان بٹنز */}
        <div className="bg-[#111] p-8 rounded-[2.5rem] border border-gray-800 w-full max-w-md shadow-2xl">
          <div className="space-y-4">
            <button onClick={() => signIn('google')} className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-xl">
              <Chrome size={20} /> Google کے ساتھ لاگ ان کریں
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] text-gray-500 py-4 rounded-2xl font-bold cursor-not-allowed opacity-50">
              <Facebook size={20} /> Facebook
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] text-gray-500 py-4 rounded-2xl font-bold cursor-not-allowed opacity-50">
              <Twitter size={20} /> Twitter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <div className="flex-1 flex flex-col relative">
        <header className="p-4 border-b border-gray-900 flex justify-between items-center bg-black/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-400">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Bot size={18} color="white"/></div>
            ASAN AI
          </div>
          <button onClick={() => signOut()} className="text-gray-500 hover:text-red-400 transition-colors p-2"><LogOut /></button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 pb-32">
          {chat.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-10">
              <Sparkles size={100} className="mb-4" />
              <h2 className="text-4xl font-bold">How can I help you today?</h2>
            </div>
          )}
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600 shadow-lg' : 'bg-[#111] border border-gray-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </main>

        {/* فینسی ان پٹ بار */}
        <div className="absolute bottom-0 w-full p-4 md:p-8 bg-gradient-to-t from-black via-black to-transparent">
          <div className="max-w-4xl mx-auto flex items-center gap-3 bg-[#111] border border-gray-800 p-2 rounded-[2rem] shadow-2xl focus-within:border-gray-600 transition-all">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
            <button onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-500 hover:text-blue-400 transition-colors"><Paperclip size={22} /></button>
            <button className="p-3 text-gray-500 hover:text-red-400 transition-colors"><Mic size={22} /></button>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message ASAN AI..." 
              className="flex-1 bg-transparent p-2 outline-none text-white"
            />
            <button className="p-3 bg-white text-black rounded-2xl hover:bg-gray-200 active:scale-95 transition-all shadow-lg"><Send size={22} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
