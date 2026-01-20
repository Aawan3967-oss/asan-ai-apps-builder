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
            borderRadius: '50%', // مکمل گول لوگو
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 80px rgba(128,0,128,0.6)', // گہرا شیڈو
            margin: '0 auto 30px',
            transition: '0.3s ease-in-out',
            transform: 'scale(1.05) rotate(5deg)', // ہلکا سا روٹیشن
          }}>
            <MessageSquare size={100} color="white" /> {/* چیٹ آئیکن */}
          </div>
          <h1 style={{
            fontSize: '4.5rem', // ٹائٹل کا سائز بڑا
            fontWeight: '900',
            letterSpacing: '-3px',
            margin: 0,
            color: '#4B0082', // گہرا پرپل ٹائٹل
          }}>ASAN AI</h1>
          <p style={{
            color: '#6A5ACD', // درمیانہ پرپل
            marginTop: '15px',
            fontSize: '1.4rem',
            fontWeight: '600',
          }}>آرٹیفیشل انٹیلیجنس اب سب لاؤ</p>
        </div>

        {/* فینسی لاگ ان کارڈ */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.9)', // ہلکا وائٹ بیک گراؤنڈ
          padding: '40px',
          borderRadius: '40px',
          border: '1px solid rgba(128,0,128,0.2)',
          width: '100%',
          maxWidth: '450px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
          transition: '0.3s ease-in-out',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <button onClick={() => signIn('google')} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              backgroundColor: '#8A2BE2', // پرپل بٹن
              color: 'white',
              padding: '18px',
              borderRadius: '25px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.1rem',
              boxShadow: '0 5px 15px rgba(138,43,226,0.4)',
              transition: '0.3s ease-in-out',
            }}>
              <Chrome size={22} /> Google کے ساتھ لاگ ان کریں
            </button>
            <button style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              backgroundColor: '#6A5ACD', // مائلڈ پرپل
              color: 'white',
              padding: '18px',
              borderRadius: '25px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'not-allowed',
              opacity: 0.7,
              boxShadow: '0 5px 15px rgba(106,90,205,0.3)',
            }}>
              <Github size={22} /> GitHub (جلد آ رہا ہے)
            </button>
          </div>
        </div>

        {/* اینیمیشن کے لیے اسٹائل */}
        <style jsx global>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    );
  }

  // جب سیشن ہو تو چیٹ انٹرفیس دکھائیں
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F0F0F8', color: '#333', fontFamily: 'sans-serif' }}>
      <header style={{
        padding: '15px 25px',
        borderBottom: '1px solid #E0E0EB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.4rem', color: '#8A2BE2' }}>
          <Sparkles size={22} /> ASAN AI
        </div>
        <button onClick={() => signOut()} style={{
          background: 'none',
          border: 'none',
          color: '#6A5ACD',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.9rem',
          transition: '0.2s',
        }}>
          <LogOut size={18} /> سائن آؤٹ
        </button>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#F8F8FC' }}>
        {chat.length === 0 ? (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2, fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', color: '#6A5ACD' }}>
            ASAN AI میں خوش آمدید!<br />مجھ سے کچھ بھی پوچھیں...
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {chat.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    backgroundColor: message.role === 'user' ? '#8A2BE2' : 'white',
                    color: message.role === 'user' ? 'white' : '#333',
                    padding: '12px 18px',
                    borderRadius: '20px',
                    maxWidth: '70%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <div style={{
        padding: '15px 25px',
        backgroundColor: 'white',
        borderTop: '1px solid #E0E0EB',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ background: 'none', border: 'none', color: '#6A5ACD', cursor: 'pointer', padding: '8px' }}><Paperclip size={22} /></button>
          <button style={{ background: 'none', border: 'none', color: '#6A5ACD', cursor: 'pointer', padding: '8px' }}><Mic size={22} /></button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="ASAN AI سے کچھ بھی پوچھیں..."
            style={{
              flex: 1,
              background: '#F0F0F8',
              border: '1px solid #D8BFD8',
              color: '#333',
              outline: 'none',
              padding: '12px 18px',
              borderRadius: '25px',
              fontSize: '1rem',
              transition: '0.2s',
            }}
          />
          <button onClick={handleSendMessage} style={{
            backgroundColor: '#8A2BE2',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '25px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(138,43,226,0.3)',
            transition: '0.2s',
          }}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
