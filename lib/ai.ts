export async function generateUniversalCode(prompt: string) {
  // ہم یہاں ایک عوامی اور مفت API استعمال کر رہے ہیں
  const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      inputs: `Create a professional web app code for: ${prompt}. Return only HTML, CSS and JS code.`,
    }),
  });
  
  const result = await response.json();
  // یہ مفت ماڈل آپ کو براہ راست ٹیکسٹ فراہم کرے گا
  return result[0]?.generated_text || "معذرت، ابھی سرور مصروف ہے۔ دوبارہ کوشش کریں۔";
}
