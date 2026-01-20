import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Sparkles, LogOut, Send, Paperclip, Mic, Chrome, Github, MessageSquare } from 'lucide-react'; // مزید آئیکنز شامل کیے گئے

export default function Home() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<any[]>([]); // چیٹ ہسٹری کے لیے اسٹیٹ

  // چیٹ میسج بھیجنے کا فنکشن (سادہ مثال)
  const handleSendMessage = async () => {
    if (input.trim() === '') return; // خالی میسج نہ بھیجیں
    const userMessage = { role: 'user', content: input };
    setChat((prevChat) => [...prevChat, userMessage]); // یوزر کا میسج چیٹ میں شامل کریں
    setInput(''); // ان پٹ فیلڈ کو خالی کریں

    // یہاں آپ API کو میسج بھیجنے کا کوڈ لکھیں گے (جیسا کہ /api/chat.ts میں)
    // فی الحال ہم ایک سادہ ڈیمو جواب دکھا رہے ہیں
    setTimeout(() => {
      setChat((prevChat) => [...prevChat, { role: 'assistant', content: `آپ نے کہا: "${userMessage.content}"۔ میں نے جواب دیا: ابھی فیچر مکمل ہو رہا ہے!` }]);
    }, 1000);
  };

  // جب سیشن نہ ہو تو لاگ ان پیج دکھائیں
  if (!session) {
    return (
      <div style={{
        backgroundColor: '#D8BFD8', // ہلکا پرپل بیک گراؤنڈ
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333', // گہرا ٹیکسٹ
        padding: '20px',
        fontFamily: 'sans-serif',
      }}>
        {/* بڑا اور جدید گول AI لوگو */}
        <div style={{
          marginBottom: '50px',
          textAlign: 'center',
          animation: 'fadeInScale 1.5s ease-out', // اینیمیشن شامل کی گئی
        }}>
          <div style={{
            width: '180px', // لوگو کا سائز بڑا کیا
            height: '180px',
            background: 'linear-gradient(135deg, #8A2BE2, #C71585)', // مزید پرپل ٹونز
            borderRadius: '50%',
