import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { Mic, Send, Paperclip, LogOut, Bot, Sparkles } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [modelType, setModelType] = useState<'openai' | 'gemini'>('openai');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f0ff]">
        <div className="p-10 bg-white rounded-3xl shadow-xl flex flex-col items-center">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
            <Bot size={50} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Asan AI</h1>
          <button 
            onClick={() => signIn('google')}
            className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-semibold shadow-sm"
          >
            <img src="https://www.google.com/favicon.ico" className="w-6" alt="google" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages, modelType }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.content }]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f7ff]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Bot className="text-purple-600" />
          <span className="font-bold text-xl text-purple-800">Asan AI</span>
        </div>
        
        {/* Model Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setModelType('openai')}
            className={`px-4 py-1 rounded-lg text-sm transition-all ${modelType === 'openai' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            GPT-4o
          </button>
          <button 
            onClick={() => setModelType('gemini')}
            className={`px-4 py-1 rounded-lg text-sm transition-all ${modelType === 'gemini' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            Gemini
          </button>
        </div>

        <button onClick={() => signOut()} className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors">
          <LogOut size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-purple-100'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-purple-100">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors"><Paperclip size={22} /></button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Ask ${modelType === 'openai' ? 'GPT-4o' : 'Gemini'} anything...`}
            className="flex-1 bg-transparent outline-none text-gray-700 py-2"
          />
          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors"><Mic size={22} /></button>
          <button 
            onClick={sendMessage}
            className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
