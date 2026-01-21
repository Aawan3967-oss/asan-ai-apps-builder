import { useState, useEffect } from 'react';
import { Mic, Send, Paperclip, Sparkles, Zap, Bot, MessageSquare } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  // نوری نستعلیق فونٹ اور فینسی لک کے لیے CSS لوڈ کرنا
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
      console.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FD] font-['Noto_Nastaliq_Urdu'] text-right" dir="rtl">
      
      {/* --- فینسی ہیڈر --- */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-purple-50">
               <Bot className="text-purple-600" size={28} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-l from-purple-800 to-indigo-600 bg-clip-text text-transparent">آسان AI</h1>
            <p className="text-[10px] font-sans text-purple-400 uppercase tracking-tighter">Your Intelligent Partner</p>
          </div>
        </div>
        <div className="flex gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse self-center"></div>
            <span className="text-xs font-sans font-bold text-gray-400 uppercase">System Active</span>
        </div>
      </header>

      {/* --- چیٹ ایریا --- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 animate-in fade-in duration-1000">
            <div className="p-6 bg-white rounded-full shadow-2xl shadow-purple-100 border border-purple-50">
                <Sparkles size={60} className="text-purple-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-purple-900">خوش آمدید!</h2>
            <p className="text-gray-400 text-lg">آج میں آپ کی کیا مدد کر سکتا ہوں؟</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[85%] p-5 rounded-[2.5rem] shadow-sm text-xl leading-[2.2] ${
              m.role === 'user' 
              ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-tl-none shadow-indigo-200' 
              : 'bg-white text-gray-800 rounded-tr-none border border-purple-50 shadow-purple-50'
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {/* --- گھومتا ہوا جدید لوگو (Loading) --- */}
        {loading && (
          <div className="flex justify-end w-full animate-in zoom-in duration-300">
            <div className="bg-white p-6 rounded-[3rem] border border-purple-100 shadow-xl flex flex-col items-center min-w-[180px]">
              <div className="relative w-16 h-16">
                 <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-t-purple-600 rounded-full animate-spin"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="text-purple-600 animate-bounce" size={24} />
                 </div>
              </div>
              <span className="mt-3 text-purple-500 font-bold animate-pulse text-sm">آسان AI سوچ رہا ہے...</span>
            </div>
          </div>
        )}
      </main>

      {/* --- ان پٹ ایریا --- */}
      <footer className="p-4 bg-transparent">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center gap-2 bg-white p-2 rounded-[2rem] shadow-2xl border border-purple-100">
            
            <button className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all">
               <Paperclip size={24} />
            </button>
            
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="اردو یا انگلش میں سوال پوچھیں..."
              className="flex-1 bg-transparent outline-none text-gray-700 py-3 px-2 text-xl placeholder:text-gray-300"
            />

            <button className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all">
               <Mic size={24} />
            </button>

            <button 
              onClick={sendMessage}
              className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:shadow-xl hover:shadow-purple-200 transition-all active:scale-90"
            >
              <Send size={24} className="rotate-180" />
            </button>
          </div>
        </div>
      </footer>

      {/* کسٹم اسکرول بار اسٹائل */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
      `}</style>
    </div>
  );
}
