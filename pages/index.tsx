import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Send, Sparkles, Bot, Zap, ShieldCheck, Lock, CreditCard, Globe, Cpu, Smartphone } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  // گوگل فونٹس کو براہِ راست لوڈ کرنا
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // --- ادائیگی کا فنکشن (JazzCash) ---
  const handlePayment = (pkgName: string, price: number) => {
    const pkrAmount = price * 280; // $1 = 280 PKR
    const message = `السلام علیکم! میں نے آسان AI کا ${pkgName} پلان منتخب کیا ہے۔ رقم: ${pkrAmount} روپے۔ برائے مہربانی جیز کیش کی تفصیلات بھیج دیں۔`;
    window.open(`https://wa.me/92YOURNUMBER?text=${encodeURIComponent(message)}`, '_blank');
  };

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
      setMessages([...newMessages, { role: 'assistant', content: "رابطہ کرنے میں مسئلہ۔ براہ کرم اپنی API Key چیک کریں۔" }]);
    } finally {
      setLoading(false);
    }
  };

  // --- 1. لاگ ان نہ ہونے کی صورت میں ڈیزائن (Pricing + Login) ---
  if (!session) {
    return (
      <div style={styles.container}>
        <div style={styles.loginCard}>
          <div style={styles.iconCircle}><ShieldCheck color="white" size={45} /></div>
          <h1 style={styles.title}>آسان AI پرو</h1>
          <p style={styles.subtitle}>محفوظ لاگ ان کے بعد $1 سے آغاز کریں</p>
          
          <button onClick={() => signIn('google')} style={styles.googleBtn}>
            <img src="https://www.google.com/favicon.ico" width="24" /> گوگل سے سائن اپ کریں
          </button>

          <div style={styles.pricingGrid}>
            {[
              { name: 'ڈیلی', price: 1, color: '#7C3AED' },
              { name: 'منتھلی', price: 15, color: '#DB2777' }
            ].map((pkg, i) => (
              <div key={i} style={{ ...styles.pkgBox, borderColor: pkg.color }}>
                <h3 style={{ color: pkg.color, margin: 0 }}>{pkg.name}</h3>
                <div style={styles.priceTag}>${pkg.price}</div>
                <button onClick={() => handlePayment(pkg.name, pkg.price)} style={{ ...styles.buyBtn, background: pkg.color }}>خریدیں</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- 2. لاگ ان کے بعد مین چیٹ انٹرفیس ---
  return (
    <div style={styles.chatContainer}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={styles.miniIcon}><Cpu size={20} /></div>
          <h2 style={{ color: '#4C1D95', margin: 0 }}>آسان AI</h2>
        </div>
        <button onClick={() => signOut()} style={styles.logoutBtn}>لاگ آؤٹ</button>
      </header>

      <main style={styles.chatArea}>
        {messages.map((m, i) => (
          <div key={i} style={{ ...styles.msgRow, justifyContent: m.role === 'user' ? 'flex-start' : 'flex-end' }}>
            <div style={{ ...styles.msgBubble, backgroundColor: m.role === 'user' ? '#7C3AED' : 'white', color: m.role === 'user' ? 'white' : '#1F2937' }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="spinner" style={styles.loadingSpinner}></div>}
      </main>

      <footer style={styles.footer}>
        <div style={styles.inputWrapper}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="اردو میں کچھ پوچھیں..." style={styles.inputField} />
          <button onClick={sendMessage} style={styles.sendBtn}><Send size={24} style={{ transform: 'rotate(180deg)' }} /></button>
        </div>
      </footer>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { width: 40px; height: 40px; border: 4px solid #F3E8FF; border-top: 4px solid #7C3AED; border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto; }
      `}</style>
    </div>
  );
}

// --- تمام ڈیزائن (CSS) یہاں ہے ---
const styles: any = {
  container: { backgroundColor: '#F0E7FF', minHeight: '100vh', padding: '20px', fontFamily: "'Noto Nastaliq Urdu', serif", direction: 'rtl', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginCard: { maxWidth: '500px', width: '100%', backgroundColor: 'white', padding: '40px', borderRadius: '40px', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' },
  iconCircle: { background: 'linear-gradient(135deg, #7C3AED, #DB2777)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' },
  title: { color: '#4C1D95', fontSize: '30px', margin: '10px 0' },
  subtitle: { color: '#7C3AED', marginBottom: '30px' },
  googleBtn: { width: '100%', padding: '15px', borderRadius: '50px', border: '1px solid #E9D5FF', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontSize: '18px', fontWeight: 'bold' },
  pricingGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' },
  pkgBox: { padding: '15px', borderRadius: '20px', border: '2px solid', textAlign: 'center' },
  priceTag: { fontSize: '24px', fontWeight: 'bold', margin: '10px 0' },
  buyBtn: { color: 'white', border: 'none', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', width: '100%' },
  chatContainer: { backgroundColor: '#F8F7FF', minHeight: '100vh', fontFamily: "'Noto Nastaliq Urdu', serif", direction: 'rtl', display: 'flex', flexDirection: 'column' },
  header: { backgroundColor: 'white', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #F3E8FF' },
  miniIcon: { backgroundColor: '#7C3AED', padding: '8px', borderRadius: '10px', color: 'white' },
  logoutBtn: { color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer' },
  chatArea: { flex: 1, padding: '20px', overflowY: 'auto' },
  msgRow: { display: 'flex', marginBottom: '15px' },
  msgBubble: { maxWidth: '80%', padding: '15px', borderRadius: '20px', fontSize: '18px', lineHeight: '2.4', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  footer: { padding: '20px', backgroundColor: 'white' },
  inputWrapper: { maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px' },
  inputField: { flex: 1, padding: '15px', borderRadius: '30px', border: '1px solid #E9D5FF', fontSize: '18px', outline: 'none' },
  sendBtn: { backgroundColor: '#7C3AED', color: 'white', border: 'none', width: '55px', height: '55px', borderRadius: '50%', cursor: 'pointer' }
};
