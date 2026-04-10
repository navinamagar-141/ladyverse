'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getUserRole } from '@/lib/supabase'
import Link from 'next/link'

function AdminLoginContent() {
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
      setError('Access denied.')
      setLoading(false)
      return
    }

    const roleData = await getUserRole(data.user.id)
    if (roleData?.role !== 'admin') {
      setError('Access denied.')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    router.push('/dashboard/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', color: '#FAF7F2', margin: 0 }}>LadyVerse</h1>
          <p style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#555', textTransform: 'uppercase', margin: '8px 0 0' }}>Admin Access</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255,50,50,0.08)', border: '1px solid rgba(255,50,50,0.15)', padding: '12px 16px', marginBottom: '20px', fontSize: '11px', color: '#ff6b6b', textAlign: 'center', letterSpacing: '0.1em' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)} required
            placeholder="Email"
            style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', outline: 'none', fontSize: '13px', color: '#FAF7F2', boxSizing: 'border-box' }}
          />
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)} required
            placeholder="Password"
            style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', outline: 'none', fontSize: '13px', color: '#FAF7F2', boxSizing: 'border-box' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '14px', background: '#FAF7F2', color: '#0A0A0A', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 'bold', opacity: loading ? 0.7 : 1, marginTop: '4px' }}>
            {loading ? '...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0A0A0A' }} />}>
      <AdminLoginContent />
    </Suspense>
  )
}