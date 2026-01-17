import React from 'react';

const Pricing = () => {
  const plans = [
    { name: "FREE", price: "0", features: ["2 Web Builds", "1 App Preview", "Basic Templates", "Branding Visible"] },
    { name: "BASIC", price: "4", features: ["10 Web Builds", "2 APK Exports", "Custom Domain", "HTML Export"] },
    { name: "PRO", price: "9", features: ["Unlimited Builds", "Unlimited Exports", "Source Code Access", "No Branding"] },
    { name: "ENTERPRISE", price: "Custom", features: ["Team Access", "White-Label", "Dedicated Manager", "API Access"] }
  ];

  const showBankDetails = () => {
    alert(`
      براہ کرم درج ذیل بینک اکاؤنٹ میں رقم جمع کروائیں:
      بینک کا نام: Meezan Bank
      اکاؤنٹ ٹائٹل: [آپ کا نام]
      IBAN: PK82MEZNXXXXXXXXXXXXXXXX
      رقم جمع کروانے کے بعد واٹس ایپ پر رسید بھیجیں تاکہ آپ کا اکاؤنٹ فعال کیا جا سکے۔
    `);
    window.open("https://wa.me/923XXXXXXXXX", "_blank");
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', direction: 'rtl' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>بہترین پلان منتخب کریں 💎</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        {plans.map((plan, i) => (
          <div key={i} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '250px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h2 style={{ color: '#0070f3' }}>{plan.name}</h2>
            <h3 style={{ fontSize: '24px' }}>${plan.price}<span style={{ fontSize: '14px', color: '#666' }}>/ماہانہ</span></h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', textAlign: 'right', fontSize: '14px' }}>
              {plan.features.map((f, j) => <li key={j} style={{ marginBottom: '10px' }}>✅ {f}</li>)}
            </ul>
            <button 
              onClick={showBankDetails}
              style={{ marginTop: '20px', padding: '10px 20px', width: '100%', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              شروع کریں
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
