import { useState, useEffect } from 'react';
import { Send, Sparkles, Bot, Zap, Cpu, Globe, CheckCircle2, LogIn } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
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
    if (!input.trim() || !session) return;
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
      setMessages([...newMessages, { role: 'assistant', content: "سرور سے رابطہ نہیں ہو سکا۔" }]);
    } finally {
      setLoading(false);
    }
  };

  // اگر لاگ ان نہیں ہے تو یہ اسکرین دکھائیں
  if (!session) {
    return (
      <div style={{ backgroundColor: '#F8F7FF', minHeight: '100vh', fontFamily: "'Noto Nastaliq Urdu', serif", direction: 'rtl', textAlign: 'center', padding: '40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '40px', boxShadow: '0 20px 60px rgba(124, 58, 237, 0.1)' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #7C3AED, #DB2777)', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Bot color="white" size={45} />
          </div>
          <h1 style={{ color: '#4C1D95', fontSize: '32px' }}>خوش آمدید!</h1>
          <p style={{ color: '#7C3AED', marginBottom: '30px' }}>آسان AI استعمال کرنے کے لیے لاگ ان کریں</p>
          
          <button onClick={() => signIn('google')} style={{ width: '100%', padding: '18px', borderRadius: '50px', border: 'none', background: 'white', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontSize: '20px', fontWeight: 'bold' }}>
            <img src="https://www.google.com/favicon.ico" width="24" /> گوگل کے ساتھ سائن اپ کریں
          </button>

          {/* پرائسنگ کارڈ */}
          <div style={{ marginTop: '40px', borderTop: '2px solid #F3E8FF', paddingTop: '30px' }}>
            <h3 style={{ color: '#4C1D95' }}>ہمارے پلانز</h3>
            <div style={{ backgroundColor: '#FDFBFF', padding: '20px', borderRadius: '25px', border: '2px solid #7C3AED' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7C3AED' }}>پریمیم پلان</div>
              <div style={{ fontSize: '30px', margin: '10px 0' }}>Rs. 1000 <span style={{ fontSize: '14px' }}>/ ماہانہ</span></div>
              <ul style={{ list-style: 'none', padding: 0, textAlign: 'right', color: '#5B21B6' }}>
                <li><CheckCircle2 size={16} inline /> لامحدود سوالات</li>
                <li><CheckCircle2 size={16} inline /> تیز ترین جوابات</li>
                <li><CheckCircle2 size={16} inline /> جدید ترین جیمنی 1.5 ماڈل</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // اگر لاگ ان ہے تو چیٹ اسکرین (آپ کا پچھلا فینسی کوڈ یہاں ڈالیں)
  return (
    <div style={{ backgroundColor: '#F8F7FF', minHeight: '100vh', fontFamily: "'Noto Nastaliq Urdu', serif", direction: 'rtl', display: 'flex', flexDirection: 'column' }}>
       {/* ... ہیڈر میں سائن آؤٹ بٹن کے ساتھ چیٹ کا کوڈ ... */}
       <header style={{ padding: '15px 25px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#4C1D95', margin: 0 }}>آسان AI</h1>
          <button onClick={() => signOut()} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer' }}>لاگ آؤٹ</button>
       </header>
       <main style={{ flex: 1, padding: '20px' }}>
          {/* چیٹ میسجز کا کوڈ جو پہلے دیا تھا */}
       </main>
    </div>
  );
}
