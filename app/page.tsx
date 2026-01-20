'use client'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  async function send() {
    if (!input) return
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    })
    const data = await res.json()
    setMessages([...messages, 'آپ: ' + input, 'AI: ' + data.reply])
    setInput('')
  }

  return (
    <main style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Asan AI</h1>
      <div>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '100%', padding: 8 }}
      />
      <button onClick={send} style={{ marginTop: 8 }}>Send</button>
    </main>
  )
}
