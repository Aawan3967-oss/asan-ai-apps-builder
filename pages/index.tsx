import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ShieldCheck, Zap, DollarSign, Lock, CreditCard, MessageCircle, ArrowLeft } from 'lucide-react';

export default function AsanAI_Secure() {
  const { data: session } = useSession();
  const [exchangeRate] = useState(280); // ڈالر کی موجودہ قیمت

  const packages = [
    { name: 'ڈیلی', price: 1, duration: 'دن', icon: <Zap size={20} /> },
    { name: 'ویکلی', price: 5, duration: 'ہفتہ', icon: <ShieldCheck size={20} /> },
    { name: 'منتھلی', price: 15, duration: 'ماہ', icon: <Lock size={20} /> },
    { name: 'سالانہ', price: 100, duration: 'سال', icon: <CreditCard size={20} /> },
  ];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', direction: 'rtl', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
      
      {/* سیکیورٹی ہیڈر */}
      <header style={{ backgroundColor: 'white', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color: '#6D28D9', margin: 0, fontSize: '24px' }}>آسان AI پرو</h1>
        {session ? (
          <button onClick={() => signOut()} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer' }}>لاگ آؤٹ ({session.user?.name})</button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10B981', fontSize: '12px' }}>
            <Lock size={14} /> اینڈ ٹو اینڈ انکرپٹڈ
          </div>
        )}
      </header>

      {!session ? (
        /* لاگ ان اور سائن اپ سیکشن */
        <div style={{ maxWidth: '500px', margin: '60px auto', padding: '40px', backgroundColor: 'white', borderRadius: '40px', textAlign: 'center', boxShadow: '0 30px 60px rgba(109, 40, 217, 0.1)' }}>
          <div style={{ background: 'linear-gradient(135deg, #6D28D9, #DB2777)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <ShieldCheck color="white" size={40} />
          </div>
          <h2 style={{ color: '#1F2937' }}>محفوظ سائن اپ</h2>
          <p style={{ color: '#6B7280', marginBottom: '30px' }}>اپنی چیٹ ہسٹری محفوظ کرنے کے لیے لاگ ان کریں</p>
          
          <button onClick={() => signIn('google')} style={{ width: '100%', padding: '15px', borderRadius: '50px', border: '1px solid #E5E7EB', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}>
            <img src="https://www.google.com/favicon.ico" width="20" /> گوگل کے ساتھ محفوظ لاگ ان
          </button>
        </div>
      ) : (
        /* پرائسنگ مینیجر */
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', color: '#4C1D95' }}>اپنا پیکج منتخب کریں</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '30px' }}>
            {packages.map((pkg, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '30px', border: '2px solid #F3E8FF', textAlign: 'center', transition: 'transform 0.3s' }}>
                <div style={{ color: '#7C3AED', marginBottom: '10px' }}>{pkg.icon}</div>
                <h3 style={{ margin: 0 }}>{pkg.name}</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937', margin: '15px 0' }}>
                  ${pkg.price} <span style={{ fontSize: '14px', color: '#9CA3AF' }}>/ {pkg.duration}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#7C3AED' }}>تقریباً {pkg.price * exchangeRate} روپے</p>
                <button 
                  onClick={() => window.open(`https://wa.me/92YOURNUMBER?text=مجھے ${pkg.name} پلان چاہیے`, '_blank')}
                  style={{ width: '100%', padding: '12px', borderRadius: '15px', border: 'none', background: '#7C3AED', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}
                >
                  ابھی حاصل کریں
                </button>
              </div>
            ))}
          </div>
          
          {/* خودکار میسجنگ نوٹس */}
          <div style={{ marginTop: '40px', backgroundColor: '#EDE9FE', padding: '20px', borderRadius: '20px', color: '#5B21B6', fontSize: '14px', textAlign: 'center' }}>
            <p>نوٹ: ادائیگی براہِ راست MCB بینک میں وصول ہوگی۔ رسید کا میسج آپ کے نمبر پر خودکار طور پر بھیج دیا جائے گا۔</p>
          </div>
        </div>
      )}
    </div>
  );
}
