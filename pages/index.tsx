import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Bot, Chrome, Sparkles, LogOut, Send, Paperclip, Mic } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
  
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 font-sans">
        {/* فینسی لوگو */}
        <div className="mb-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)] mb-4 rotate-12 transition-all">
            <Bot size={50} color="white" />
          </div>
          <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">ASAN AI</h1>
          <p className="text-gray-500 mt-2 font-semibold">Smart AI for Everyone</p>
        </div>

        {/* لاگ ان بٹن */}
        <div className="bg-[#111] p-8 rounded-[3rem] border border-gray-800 w-full max-w-md shadow-2xl">
          <button onClick={() => signIn('google')} className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl">
            <Chrome size={22} /> Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-900 flex justify-between items-center bg-black/50">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-400"><Bot /> ASAN AI</div>
          <button onClick={() => signOut()} className="text-gray-500"><LogOut /></button>
        </header>
        <main className="flex-1 p-10 flex items-center justify-center opacity-20"><h2 className="text-4xl font-bold">آپ کا استقبال ہے!</h2></main>
      </div>
    </div>
  );
}
