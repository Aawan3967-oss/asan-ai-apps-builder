import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Mic, Paperclip, Send, LogOut, Bot, User, Sparkles } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newChat = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newChat }),
      });
      const data = await res.json();
      setChat([...newChat, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 text-center">
          <Bot size={64} className="mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-extrabold mb-2">Asan AI Builder</h1>
          <p className="mb-8 text-blue-100">آپ کا اپنا جدید ترین آرٹیفیشل انٹیلیجنس معاون</p>
          <button 
            onClick={() => signIn('google')} 
            className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Google کے ساتھ شروع کریں
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b p-4 flex justify-between items-center px-6">
        <div className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-black text-2xl">
          <Sparkles className="text-blue-600" /> Asan AI
        </div>
        <button onClick={() => signOut()} className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors font-medium">
          <LogOut size={20} /> سائن آؤٹ
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {chat.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Bot size={48} className="mx-auto mb-4 opacity-20" />
            <p>آج میں آپ کی کیا مدد کر سکتا ہوں؟</p>
          </div>
        )}
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                {msg.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border rounded-tl-none text-gray-800'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-sm text-gray-400 animate-pulse">Asan AI جواب لکھ رہا ہے...</div>}
      </main>

      {/* Fancy Input Bar */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex gap-2 items-center bg-gray-100 p-2 rounded-2xl border focus-within:border-blue-400 transition-all">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*,.pdf" 
            onChange={() => alert('فائل منتخب کر لی گئی ہے')}
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-500 hover:bg-white hover:text-blue-600 rounded-xl transition-all shadow-sm"
          >
            <Paperclip size={22} />
          </button>
          <button 
            type="button" 
            className="p-3 text-gray-500 hover:bg-white hover:text-red-500 rounded-xl transition-all shadow-sm"
          >
            <Mic size={22} />
          </button>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="اپنا سوال یہاں لکھیں..." 
            className="flex-1 bg-transparent p-3 outline-none text-gray-700"
          />
          <button 
            type="submit" 
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Send size={22} />
          </button>
        </form>
      </div>
    </div>
  );
}
