import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt) return;
    const newMessages = [...messages, { role: 'user', text: prompt }];
    setMessages(newMessages);
    setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', { // فرض کریں آپ کا API روٹ یہ ہے
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: 'ai', text: data.text }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', text: "خرابی: گوگل سرور سے رابطہ نہیں ہو سکا۔" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', direction: 'rtl', fontFamily: 'sans-serif' }}>
      {/* پرائسنگ پیج کا لنک */}
      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <Link href="/pricing">
          <button style={{ padding: '10px 20px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            قیمتیں اور پلانس دیکھیں 💎
          </button>
        </Link>
      </div>

      <h1 style={{ textAlign: 'center' }}>AI چیٹ اور ایپ بلڈر 🚀</h1>
      
      <div style={{ height: '400px', border: '1px solid #ddd', overflowY: 'auto', padding: '15px', borderRadius: '12px', backgroundColor: '#fff' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '15px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <div style={{ display: 'inline-block', padding: '10px', borderRadius: '10px', backgroundColor: msg.role === 'user' ? '#0070f3' : '#f0f0f0', color: msg.role === 'user' ? 'white' : '#333' }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="یہاں کچھ لکھیں..."
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button onClick={sendMessage} style={{ padding: '12px 25px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {loading ? '...' : 'بھیجیں'}
        </button>
      </div>
    </div>
  );
}
