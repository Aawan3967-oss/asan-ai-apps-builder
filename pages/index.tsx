import { useState, useEffect } from 'react';
import { Send, Sparkles, Bot, Zap, Cpu, Globe } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDFBFF] font-['Noto_Nastaliq_Urdu'] text-right" dir="rtl">
      
      {/* --- فینسی ہیڈر --- */}
      <header className="p-4 bg-white/70 backdrop-blur-xl border-b border-purple-100 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Cpu className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-l from-purple-800 to-indigo-600 bg-clip-text text-transparent">آسان AI</h1>
            <div className="flex items-center gap-1 text-[10px] text-green-500 font-sans font-bold uppercase tracking-widest">
              <Globe size={10} /> Online System
            </div>
          </div>
        </div>
      </header>

      {/* --- چیٹ ایریا --- */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-60">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
              <Bot size={120} className="text-purple-100 relative" />
            </div>
            <h2 className="text-3xl text-purple-900 font-bold mb-2">خوش آمدید!</h2>
            <p className="text-purple-400 text-lg">میں آج آپ کی کیا مدد کر سکتا ہوں؟</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-5 duration-500`}>
            <div className={`max-w-[85%] p-6 rounded-[2.5rem] shadow-md text-xl leading-[2.6] ${
              m.role === 'user' 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-tl-none' 
              : 'bg-white text-gray-800 rounded-tr-none border border-purple-50'
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {/* --- گھومتا ہوا بڑا ویب لوگو (Loading) --- */}
        {loading && (
          <div className="flex justify-end w-full">
            <div className="bg-white p-10 rounded-[3rem] border border-purple-100 shadow-2xl flex flex-col items-center gap-6 min-w-[240px] animate-in zoom-in-95 duration-300">
              <div className="relative w-24 h-24">
                 <div className="absolute inset-0 border-[6px] border-purple-50 rounded-full"></div>
                 <div className="absolute inset-0 border-[6px] border-t-purple-600 rounded-full animate-spin"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Bot size={50} className="text-purple-600 animate-bounce" />
                 </div>
              </div>
              <div className="text-center">
                <span className="block text-purple-700 font-bold text-xl animate-pulse">آسان AI سوچ رہا ہے...</span>
                <span className="text-[10px] text-purple-300 font-sans tracking-widest uppercase">Processing Intelligence</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- جدید ان پٹ باکس --- */}
      <footer className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white p-3 rounded-[2rem] shadow-[0_-10px_40px_-15px_rgba(124,58,237,0.1)] border border-purple-100 focus-within:border-purple-400 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اپنا سوال یہاں ٹائپ کریں..."
            className="flex-1 bg-transparent outline-none text-gray-700 py-3 px-4 text-xl placeholder:text-gray-300"
          />
          <button 
            onClick={sendMessage}
            className="p-5 bg-gradient-to-tr from-purple-600 to-pink-500 text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all group"
          >
            <Send size={24} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-blob { animation: blob 5s infinite; }
      `}</style>
    </div>
  );
}
