'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const intent = searchParams.get('intent')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError || !data.user) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push(intent === 'checkout' ? '/checkout' : '/')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#631621', margin: 0, fontStyle: 'italic' }}>LadyVerse</h1>
          </Link>
          <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#A68F6D', textTransform: 'uppercase', margin: '8px 0 0' }}>
            {intent === 'checkout' ? 'Sign in to complete your order' : 'Welcome back'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(99,22,33,0.08)', border: '1px solid rgba(99,22,33,0.2)', padding: '12px 16px', marginBottom: '20px', fontSize: '11px', color: '#631621' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Email Address</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="your@email.com"
              style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.3)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.3)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '16px', background: '#631621', color: '#FAF7F2', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 'bold', opacity: loading ? 0.7 : 1, marginTop: '8px' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '10px', color: '#A68F6D' }}>
          New customer?{' '}
          <Link href="/signup" style={{ color: '#631621', textDecoration: 'underline' }}>Create Account</Link>
        </p>

      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAF7F2' }} />}>
      <LoginContent />
    </Suspense>
  )
}