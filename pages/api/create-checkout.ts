export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { plan } = req.body;
    
    // یہاں ہم ایک 'Payment Link' بنائیں گے جو آپ کے اکاؤنٹ سے جڑا ہوگا
    // فی الحال ہم ایک فرضی لنک دے رہے ہیں، آپ اسے Lemon Squeezy سے بدلیں گے
    const paymentLinks: any = {
      BASIC: "https://your-store.lemonsqueezy.com/checkout/buy/basic-id",
      PRO: "https://your-store.lemonsqueezy.com/checkout/buy/pro-id"
    };

    res.status(200).json({ url: paymentLinks[plan] });
  }
}
