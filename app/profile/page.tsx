'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const fullName = user.user_metadata?.full_name || 'Customer'
      setUser({ email: user.email || '', name: fullName })
      setName(fullName)
      setLoading(false)
    }
    check()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleSave = async () => {
    await supabase.auth.updateUser({ data: { full_name: name } })
    setUser(prev => prev ? { ...prev, name } : null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#A68F6D', textTransform: 'uppercase' }}>Loading...</p>
    </div>
  )

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'My Orders' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'profile', label: 'Profile' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0EB', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{ width: '240px', background: '#631621', color: '#FAF7F2', display: 'flex', flexDirection: 'column', flexShrink: 0, minHeight: '100vh' }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: 0, color: '#FAF7F2' }}>LadyVerse</p>
          </Link>
          <p style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.6, textTransform: 'uppercase', margin: '6px 0 0' }}>My Account</p>
        </div>

        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </div>
          <p style={{ fontSize: '13px', fontFamily: 'Georgia, serif', margin: '0 0 4px' }}>{user?.name}</p>
          <p style={{ fontSize: '9px', opacity: 0.5, margin: 0, wordBreak: 'break-all' }}>{user?.email}</p>
        </div>

        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              width: '100%', textAlign: 'left', padding: '13px 24px',
              background: activeTab === item.id ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: 'none', color: '#FAF7F2', cursor: 'pointer',
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              borderLeft: activeTab === item.id ? '3px solid #D4AF37' : '3px solid transparent'
            }}>{item.label}</button>
          ))}
        </nav>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/" style={{
            display: 'block', textAlign: 'center', padding: '10px',
            border: '1px solid rgba(255,255,255,0.2)', color: '#FAF7F2',
            textDecoration: 'none', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase'
          }}>
            Continue Shopping
          </Link>
          <button onClick={handleSignOut} style={{
            width: '100%', padding: '12px', background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)', color: '#FAF7F2',
            cursor: 'pointer', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase'
          }}>Sign Out</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '40px' }}>

        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 8px' }}>
                Welcome back, {user?.name.split(' ')[0]}
              </h1>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: 0 }}>Your LadyVerse account</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {[
                { label: 'Total Orders', value: '0' },
                { label: 'Wishlist Items', value: '0' },
                { label: 'Total Spent (NPR)', value: '0' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#FAF7F2', padding: '24px', borderBottom: '3px solid #631621' }}>
                  <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 12px' }}>{stat.label}</p>
                  <p style={{ fontSize: '28px', fontFamily: 'Georgia, serif', color: '#631621', margin: 0 }}>{stat.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#FAF7F2', padding: '40px', textAlign: 'center', border: '1px dashed rgba(99,22,33,0.2)' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#631621', margin: '0 0 8px' }}>No orders yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: '0 0 28px' }}>Start exploring our curated collections</p>
              <Link href="/" style={{
                display: 'inline-block', padding: '14px 40px', background: '#631621', color: '#FAF7F2',
                textDecoration: 'none', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold'
              }}>Shop Now</Link>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 32px' }}>My Orders</h1>
            <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" style={{ marginBottom: '16px', opacity: 0.5 }}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#631621', margin: '0 0 8px' }}>No orders yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>Your order history will appear here</p>
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 32px' }}>My Wishlist</h1>
            <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" style={{ marginBottom: '16px', opacity: 0.5 }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#631621', margin: '0 0 8px' }}>Your wishlist is empty</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>Save items you love for later</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 32px' }}>My Profile</h1>
            <div style={{ background: '#FAF7F2', padding: '32px', maxWidth: '500px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.2)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    style={{ width: '100%', padding: '14px 16px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(99,22,33,0.1)', outline: 'none', fontSize: '13px', color: '#A68F6D', boxSizing: 'border-box', cursor: 'not-allowed' }}
                  />
                </div>
                <button onClick={handleSave} style={{
                  padding: '14px', background: saved ? '#2D7A4F' : '#631621', color: '#FAF7F2',
                  border: 'none', cursor: 'pointer', fontSize: '11px',
                  letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold',
                  transition: 'background 0.3s'
                }}>
                  {saved ? '✓ Saved' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}