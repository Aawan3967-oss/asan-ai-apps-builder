import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // یہاں ایپ جنریٹ کرنے کا لاجک آئے گا
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Asan AI App Builder</h1>
      <p>اپنی ایپ کا نام یا تفصیل لکھیں اور ایک کلک میں ایپ بنائیں</p>
      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="مثال: ایک سادہ ای کامرس ویب سائٹ" 
        style={{ padding: '10px', width: '300px', borderRadius: '5px' }}
      />
      <br /><br />
      <button 
        onClick={handleGenerate} 
        style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? 'تیار ہو رہی ہے...' : 'ایپ بنائیں'}
      </button>
    </div>
  );
}
