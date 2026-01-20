import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { Mic, Send, Paperclip, LogOut, Bot, Sparkles } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
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
      console.error("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f0ff] font-['Noto_Nastaliq_Urdu']" dir="rtl">
        <div className="p-12 bg-white rounded-[40px] shadow-2xl flex flex-col items-center border border-purple-100">
          <div className="w-32 h-32 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-xl animate-bounce">
            <Bot size={70} color="white" />
          </div>
          <h1 className="text-5xl font-bold text-purple-900 mb-10">آسان AI</h1>
          <button onClick={() => signIn('google')} className="flex items-center gap-4 px-10 py-5 bg-white border-2 border-purple-100 rounded-2xl hover:bg-purple-50 transition-all font-bold shadow-lg text-purple-700 text-xl">
            <img src="https://www.google.com/favicon.ico" className="w-7" alt="google" />
            گوگل لاگ ان
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#fdfcff] font-['Noto_Nastaliq_Urdu'] text-right" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between p-5 bg-white border-b border-purple-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-xl shadow-md"><Sparkles className="text-white" size={24} /></div>
          <span className="font-bold text-2xl text-purple-800">آسان AI مینیجر</span>
        </div>
        <button onClick={() => signOut()} className="p-3 text-red-400 hover:bg-red-50 rounded-full transition-all">
          <LogOut size={26} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-6 rounded-[30px] shadow-sm text-xl leading-[2.5] ${m.role === 'user' ? 'bg-purple-600 text-white rounded-tl-none shadow-purple-200' : 'bg-white text-gray-800 rounded-tr-none border border-purple-100'}`}>
              {m.content}
            </div>
          </div>
        ))}
        
        {/* اینیمیٹڈ ویب لوگو (گھومتا ہوا) */}
        {loading && (
          <div className="flex justify-end w-full">
            <div className="bg-white p-8 rounded-[35px] border border-purple-100 shadow-md flex flex-col items-center gap-4 min-w-[200px]">
              <div className="animate-spin duration-[2000ms] ease-in-out">
                <Bot size={60} className="text-purple-600" />
              </div>
              <span className="text-purple-500 font-bold animate-pulse text-lg">آسان AI جواب تلاش کر رہا ہے...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-purple-50">
        <div className="max-w-5xl mx-auto flex items-center gap-4 bg-purple-50 p-3 rounded-[25px] border border-purple-100 shadow-inner">
          <button className="p-3 text-purple-300 hover:text-purple-600"><Paperclip size={26} /></button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اپنا سوال یہاں ٹائپ کریں..."
            className="flex-1 bg-transparent outline-none text-gray-700 py-3 px-2 text-xl"
          />
          <button className="p-3 text-purple-300 hover:text-purple-600"><Mic size={26} /></button>
          <button onClick={sendMessage} className="p-5 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all shadow-xl hover:scale-105 active:scale-95">
            <Send size={24} className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
