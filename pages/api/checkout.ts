export default async function handler(req: any, res: any) {
  // یہاں آپ Lemon Squeezy یا Stripe کا API لنک استعمال کریں گے
  const checkoutUrl = "آپ_کا_پیمنٹ_لنک_یہاں"; 
  res.status(200).json({ url: checkoutUrl });
}
