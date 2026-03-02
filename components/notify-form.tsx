'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function NotifyForm() {
  const [email, setEmail] = useState('')
  const [thoughts, setThoughts] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'notify',
          name: email,
          email,
          story: thoughts || '(No message — just wants to be notified)',
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
        <CheckCircle size={36} style={{ color: '#F59E0B' }} />
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            color: '#ffffff',
          }}
        >
          You&apos;re on the list.
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: 340 }}>
          We&apos;ll reach out the moment we open our doors. Thanks for being part of the journey.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10,
          padding: '14px 18px',
          color: '#fff',
          fontSize: '14px',
          outline: 'none',
          width: '100%',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'rgba(245,158,11,0.5)')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
      <textarea
        placeholder="What caught your eye? Any thoughts? (optional)"
        value={thoughts}
        onChange={(e) => setThoughts(e.target.value)}
        rows={3}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10,
          padding: '14px 18px',
          color: '#fff',
          fontSize: '14px',
          outline: 'none',
          resize: 'none',
          width: '100%',
          lineHeight: 1.6,
        }}
        onFocus={(e) => (e.target.style.borderColor = 'rgba(245,158,11,0.5)')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
      {status === 'error' && (
        <p style={{ color: '#f87171', fontSize: '13px' }}>
          Something went wrong — please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex items-center justify-center gap-2 font-semibold transition-all"
        style={{
          background: status === 'sending' ? 'rgba(245,158,11,0.5)' : '#F59E0B',
          color: '#000',
          border: 'none',
          borderRadius: 10,
          padding: '14px 28px',
          fontSize: '13px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          width: '100%',
        }}
      >
        {status === 'sending' ? 'Sending…' : (
          <>Notify Me &amp; Share Thoughts <ArrowRight size={15} /></>
        )}
      </button>
    </form>
  )
}
