import { useState } from 'react';

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
      const res = await fetch('/api/create-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'ai', text: data.code }]);
    } catch (err) {
      alert("رابطہ منقطع ہو گیا!");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>AI چیٹ اور ایپ بلڈر 💬</h1>
      
      {/* چیٹ ونڈو */}
      <div style={{ height: '400px', border: '1px solid #ddd', overflowY: 'scroll', padding: '10px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '15px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <div style={{ 
              display: 'inline-block', padding: '10px', borderRadius: '10px', 
              backgroundColor: msg.role === 'user' ? '#0070f3' : '#eee', 
              color: msg.role === 'user' ? 'white' : 'black',
              maxWidth: '80%', direction: msg.role === 'user' ? 'rtl' : 'ltr'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <p style={{ textAlign: 'center' }}>AI سوچ رہا ہے...</p>}
      </div>

      {/* ان پٹ ایریا */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="یہاں کچھ لکھیں..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={sendMessage} 
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          بھیجیں
        </button>
      </div>
    </div>
  );
}
