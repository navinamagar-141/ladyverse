'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

function SignupContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Insert customer role
    if (data.user) {
      await supabase.from('user_roles').insert({
        id: data.user.id,
        role: 'customer',
        category: null
      })
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: '440px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(99,22,33,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#631621" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', color: '#631621', margin: '0 0 12px' }}>Account Created!</h2>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: '0 0 8px' }}>
          Check your email to verify your account
        </p>
        <p style={{ fontSize: '11px', color: '#A68F6D', margin: '0 0 32px' }}>{email}</p>
        <button onClick={() => router.push('/login')} style={{
          padding: '16px 40px', background: '#631621', color: '#FAF7F2',
          border: 'none', cursor: 'pointer', fontSize: '11px',
          letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold'
        }}>
          Go to Login
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#631621', margin: 0, fontStyle: 'italic' }}>LadyVerse</h1>
          </Link>
          <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#A68F6D', textTransform: 'uppercase', margin: '8px 0 0' }}>Create your account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(99,22,33,0.08)', border: '1px solid rgba(99,22,33,0.2)', padding: '12px 16px', marginBottom: '20px', fontSize: '11px', color: '#631621' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Your full name"
              style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.3)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.3)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Min. 6 characters"
              style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.3)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ padding: '16px', background: '#631621', color: '#FAF7F2', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 'bold', opacity: loading ? 0.7 : 1, marginTop: '8px' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '10px', color: '#A68F6D' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#631621', textDecoration: 'underline' }}>Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAF7F2' }} />}>
      <SignupContent />
    </Suspense>
  )
}