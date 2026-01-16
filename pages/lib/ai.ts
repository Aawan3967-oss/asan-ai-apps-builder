import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateUniversalCode(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { 
        role: "system", 
        content: "You are a master web developer. Generate a complete, single-file HTML/CSS/JS solution for any app or website requested. Make it professional and responsive." 
      },
      { role: "user", content: `Create a full website/app for: ${prompt}` }
    ],
  });

  return response.choices[0].message.content;
}
