import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateApp = async () => {
    setLoading(true);
    const res = await fetch('/api/create-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (data.code) setCode(data.code);
    setLoading(false);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'system-ui', direction: 'rtl', textAlign: 'center' }}>
      <h1>آسان AI ایپ بلڈر</h1>
      <textarea 
        style={{ width: '90%', height: '120px', padding: '10px', borderRadius: '10px' }}
        placeholder="آپ کس قسم کی ایپ یا ویب سائٹ بنانا چاہتے ہیں؟"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br /><br />
      <button 
        onClick={generateApp}
        style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        {loading ? 'AI کوڈ تیار کر رہا ہے...' : 'ایپ جنریٹ کریں'}
      </button>

      {code && (
        <div style={{ marginTop: '30px', textAlign: 'left', direction: 'ltr' }}>
          <h3>آپ کا کوڈ تیار ہے:</h3>
          <pre style={{ background: '#f4f4f4', padding: '15px', overflowX: 'auto', border: '1px solid #ddd' }}>
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}
