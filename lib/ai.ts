export async function generateUniversalCode(prompt: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Write full HTML, CSS, and JS code for: ${prompt}. Return only the code without any explanation.` }] }]
      }),
    });

    const result = await response.json();
    // گوگل جیمنی کا جواب حاصل کرنا
    return result.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error(error);
    return "معذرت، گوگل سرور سے رابطہ نہیں ہو سکا یا چابی غلط ہے۔";
  }
}
