'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getUserRole } from '@/lib/supabase'

export default function SellerDashboard() {
  const [category, setCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const roleData = await getUserRole(user.id)
      if (roleData?.role !== 'seller') { router.push('/login'); return }
      setCategory(roleData.category || '')
      setLoading(false)
    }
    check()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#A68F6D', textTransform: 'uppercase' }}>Loading...</p>
    </div>
  )

  const stats = [
    { label: 'Products Listed', value: '0' },
    { label: 'Orders This Month', value: '0' },
    { label: 'Revenue (NPR)', value: '0' },
    { label: 'Pending Shipments', value: '0' },
  ]

  const navItems = ['Dashboard', 'My Products', 'Orders', 'POS System', 'Analytics', 'Settings']

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0EB', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{ width: '240px', background: '#631621', color: '#FAF7F2', display: 'flex', flexDirection: 'column', flexShrink: 0, minHeight: '100vh' }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: 0 }}>LadyVerse</p>
          <p style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.6, textTransform: 'uppercase', margin: '6px 0 0' }}>Seller Portal</p>
        </div>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', opacity: 0.5, textTransform: 'uppercase', margin: '0 0 4px' }}>Your Category</p>
          <p style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{category}</p>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navItems.map((item, i) => (
            <button key={item} style={{
              width: '100%', textAlign: 'left', padding: '13px 24px',
              background: i === 0 ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: 'none', color: '#FAF7F2', cursor: 'pointer',
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              borderLeft: i === 0 ? '3px solid #D4AF37' : '3px solid transparent'
            }}>{item}</button>
          ))}
        </nav>
        <div style={{ padding: '24px' }}>
          <button onClick={handleSignOut} style={{
            width: '100%', padding: '12px', background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)', color: '#FAF7F2',
            cursor: 'pointer', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase'
          }}>Sign Out</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 8px' }}>
            Welcome, {category} Seller
          </h1>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: 0 }}>
            Here's your store overview
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ background: '#FAF7F2', padding: '24px', borderBottom: '3px solid #631621' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 12px' }}>{stat.label}</p>
              <p style={{ fontSize: '28px', fontFamily: 'Georgia, serif', color: '#631621', margin: 0 }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Add Product CTA */}
        <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center', border: '1px dashed rgba(99,22,33,0.2)' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#631621', margin: '0 0 8px' }}>
            No products listed yet
          </p>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: '0 0 28px' }}>
            Add your first {category} product to start selling
          </p>
          <button style={{
            padding: '14px 40px', background: '#631621', color: '#FAF7F2',
            border: 'none', cursor: 'pointer', fontSize: '11px',
            letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold'
          }}>
            + Add Product
          </button>
        </div>
      </div>

    </div>
  )
}