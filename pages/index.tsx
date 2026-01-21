import { useState, useEffect } from 'react';
import { Mic, Send, Paperclip, Bot, Sparkles, BrainCircuit } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  // اردو نوری نستعلیق فونٹ لوڈ کرنا
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
      console.error("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#fdfcff] font-['Noto_Nastaliq_Urdu'] text-right shadow-inner" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between p-5 bg-white border-b border-purple-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-2xl shadow-lg animate-pulse">
            <Sparkles className="text-white" size={28} />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-purple-900 leading-none">آسان AI</h1>
            <span className="text-[10px] text-purple-400 font-sans tracking-widest uppercase">Powered by Gemini & OpenAI</span>
          </div>
        </div>
        <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
          <span className="text-purple-600 text-sm font-bold italic">آن لائن</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-40">
            <Bot size={100} className="text-purple-200 mb-4" />
            <p className="text-2xl text-purple-300">میں آپ کی کیا مدد کر سکتا ہوں؟</p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-6 rounded-[35px] shadow-sm text-xl leading-[2.5] transition-all transform hover:scale-[1.01] ${m.role === 'user' ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-tl-none' : 'bg-white text-gray-800 rounded-tr-none border border-purple-100'}`}>
              {m.content}
            </div>
          </div>
        ))}
        
        {/* اینیمیٹڈ ویب لوگو (جب جواب آ رہا ہو) */}
        {loading && (
          <div className="flex justify-end w-full">
            <div className="bg-white p-8 rounded-[40px] border border-purple-100 shadow-xl flex flex-col items-center gap-4 min-w-[220px] animate-in fade-in zoom-in duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl animate-pulse"></div>
                <div className="relative animate-spin duration-[3000ms] ease-in-out">
                  <Bot size={65} className="text-purple-600" />
                </div>
              </div>
              <span className="text-purple-500 font-bold animate-pulse text-lg mt-2">آسان AI سوچ رہا ہے...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-purple-50">
        <div className="max-w-5xl mx-auto flex items-center gap-4 bg-purple-50 p-3 rounded-[30px] border border-purple-200 shadow-lg focus-within:ring-2 ring-purple-300 transition-all">
          <button className="p-3 text-purple-400 hover:text-purple-600 transition-colors"><Paperclip size={28} /></button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اپنا سوال یہاں لکھیں..."
            className="flex-1 bg-transparent outline-none text-gray-800 py-3 px-2 text-xl placeholder:text-purple-200"
          />
          <button className="p-3 text-purple-400 hover:text-purple-600 transition-colors"><Mic size={28} /></button>
          <button 
            onClick={sendMessage} 
            className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:shadow-purple-300 transition-all shadow-xl hover:scale-105 active:scale-95 group"
          >
            <Send size={26} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
