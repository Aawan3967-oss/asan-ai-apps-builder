import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // چیٹ کو خودکار طور پر نیچے سکرول کرنے کے لیے
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMsg = { role: 'user', text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      // ہم اب اپنے داخلی API روٹ کو کال کر رہے ہیں جو کہ زیادہ محفوظ ہے
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [...prev, { role: 'ai', text: data.text }]);
      } else {
        throw new Error(data.text || "سرور کی طرف سے غلطی");
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: "خرابی: AI سے رابطہ نہیں ہو سکا۔ براہ کرم انٹرنیٹ یا API کی سیٹنگز چیک کریں۔" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', direction: 'rtl', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* ہیڈر اور پرائسنگ بٹن */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: '#fff', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>AI چیٹ اور ایپ بلڈر 🚀</h2>
        <Link href="/pricing">
          <button style={{ padding: '8px 15px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            قیمتیں اور پلانس 💎
          </button>
        </Link>
      </div>
      
      {/* چیٹ ڈسپلے ایریا */}
      <div 
        ref={scrollRef}
        style={{ height: '450px', border: '1px solid #eee', overflowY: 'auto', padding: '15px', borderRadius: '15px', backgroundColor: '#fff', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}
      >
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '150px' }}>آج میں آپ کی کیا مدد کر سکتا ہوں؟</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '15px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '12px 16px', 
              borderRadius: '15px', 
              maxWidth: '85%',
              lineHeight: '1.5',
              backgroundColor: msg.role === 'user' ? '#0070f3' : '#f0f2f5', 
              color: msg.role === 'user' ? 'white' : '#333',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <p style={{ color: '#0070f3', fontSize: '12px' }}>AI جواب لکھ رہا ہے...</p>}
      </div>

      {/* ان پٹ ایریا */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }} 
          placeholder="یہاں اپنا سوال لکھیں..." 
        />
        <button 
          onClick={sendMessage} 
          disabled={loading}
          style={{ padding: '12px 25px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? '...' : 'بھیجیں'}
        </button>
      </div>
    </div>
  );
}
