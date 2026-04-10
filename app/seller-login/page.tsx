'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getUserRole } from '@/lib/supabase'
import Link from 'next/link'

function SellerLoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError || !data.user) {
      setError('Invalid credentials.')
      setLoading(false)
      return
    }

    const roleData = await getUserRole(data.user.id)
    if (roleData?.role !== 'seller') {
      setError('This account does not have seller access.')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    router.push('/dashboard/seller')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#FAF7F2', margin: 0, fontStyle: 'italic' }}>LadyVerse</h1>
          <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#A68F6D', textTransform: 'uppercase', margin: '8px 0 0' }}>Seller Portal</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.2)', padding: '12px 16px', marginBottom: '20px', fontSize: '11px', color: '#ff6b6b' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="jewelry@ladyverse.com"
              style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontSize: '13px', color: '#FAF7F2', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontSize: '13px', color: '#FAF7F2', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '16px', background: '#631621', color: '#FAF7F2', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 'bold', opacity: loading ? 0.7 : 1, marginTop: '8px' }}>
            {loading ? 'Signing in...' : 'Access Seller Portal'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/" style={{ fontSize: '10px', color: '#A68F6D', letterSpacing: '0.2em', textTransform: 'uppercase' }}>← Back to Store</Link>
        </p>
      </div>
    </div>
  )
}

export default function SellerLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1A1A1A' }} />}>
      <SellerLoginContent />
    </Suspense>
  )
}