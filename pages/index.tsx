import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateApp = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setCode(data.code);
    } catch (err) {
      alert("کچھ غلط ہو گیا!");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui', textAlign: 'right', direction: 'rtl' }}>
      <h1>آسان مفت AI بلڈر 🚀</h1>
      <textarea 
        placeholder="مثلاً: ایک کیلکولیٹر بنا دیں..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px' }}
      />
      <button 
        onClick={generateApp} 
        disabled={loading}
        style={{ 
          marginTop: '10px', padding: '15px 30px', 
          backgroundColor: loading ? '#ccc' : '#0070f3', 
          color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' 
        }}
      >
        {loading ? 'انتظار کریں، AI کام کر رہا ہے...' : 'ایپ جنریٹ کریں'}
      </button>

      {code && (
        <div style={{ marginTop: '20px', textAlign: 'left', direction: 'ltr' }}>
          <h3>تیار شدہ کوڈ:</h3>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '15px', overflow: 'auto', borderRadius: '8px' }}>
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}
