import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { Mic, Send, Paperclip, LogOut, Bot } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  // اردو فونٹ لاگو کرنا
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true); // لوڈنگ شروع
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
      setLoading(false); // لوڈنگ ختم
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f0ff] font-['Noto_Nastaliq_Urdu']">
        <div className="p-10 bg-white rounded-3xl shadow-2xl flex flex-col items-center border-2 border-purple-200">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse">
            <Bot size={50} color="white" />
          </div>
          <h1 className="text-4xl font-bold text-purple-900 mb-8">آسان AI</h1>
          <button onClick={() => signIn('google')} className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-purple-100 rounded-2xl hover:bg-purple-50 transition-all font-semibold shadow-md text-purple-700">
            <img src="https://www.google.com/favicon.ico" className="w-6" alt="google" />
            گوگل کے ساتھ لاگ ان کریں
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#f8f7ff] font-['Noto_Nastaliq_Urdu'] text-right" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-purple-100">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg"><Bot className="text-white" /></div>
          <span className="font-bold text-2xl text-purple-800">آسان AI</span>
        </div>
        <button onClick={() => signOut()} className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors">
          <LogOut size={24} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm leading-loose ${m.role === 'user' ? 'bg-purple-600 text-white rounded-tl-none' : 'bg-white text-gray-800 rounded-tr-none border border-purple-100'}`}>
              {m.content}
            </div>
          </div>
        ))}
        
        {/* اینیمیٹڈ لوگو جب AI جواب دے رہا ہو */}
        {loading && (
          <div className="flex justify-end w-full">
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col items-center gap-4">
              <div className="animate-spin duration-1000">
                <Bot size={40} className="text-purple-600" />
              </div>
              <span className="text-purple-400 text-sm animate-pulse">آسان AI سوچ رہا ہے...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-purple-100">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-purple-50 p-2 rounded-2xl border border-purple-200">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="یہاں کچھ لکھیں..."
            className="flex-1 bg-transparent outline-none text-gray-700 py-3 px-4 text-lg"
          />
          <button onClick={sendMessage} className="p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg">
            <Send size={22} className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
