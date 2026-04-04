'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getUserRole } from '@/lib/supabase'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const roleData = await getUserRole(user.id)
      if (roleData?.role !== 'admin') { router.push('/login'); return }
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
      <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#A68F6D', textTransform: 'uppercase' }}>Verifying access...</p>
    </div>
  )

  const stats = [
    { label: 'Total Sellers', value: '5' },
    { label: 'Total Customers', value: '0' },
    { label: 'Total Orders', value: '0' },
    { label: 'Revenue (NPR)', value: '0' },
  ]

  const sellers = [
    { category: 'Fine Jewelry', email: 'jewelry@ladyverse.com', status: 'Active' },
    { category: 'Luxury Skincare', email: 'skincare@ladyverse.com', status: 'Active' },
    { category: 'Designer Fashion', email: 'fashion@ladyverse.com', status: 'Active' },
    { category: 'Shoes', email: 'shoes@ladyverse.com', status: 'Active' },
    { category: 'Wellness & Home', email: 'wellness@ladyverse.com', status: 'Active' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0EB', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{ width: '240px', background: '#1A1A1A', color: '#FAF7F2', display: 'flex', flexDirection: 'column', flexShrink: 0, minHeight: '100vh' }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: 0 }}>LadyVerse</p>
          <p style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.4, textTransform: 'uppercase', margin: '6px 0 0' }}>Admin Console</p>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {['Overview', 'Sellers', 'Customers', 'Orders', 'Products', 'Settings'].map((item, i) => (
            <button key={item} style={{
              width: '100%', textAlign: 'left', padding: '13px 24px',
              background: i === 0 ? 'rgba(255,255,255,0.07)' : 'transparent',
              border: 'none', color: '#FAF7F2', cursor: 'pointer',
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              borderLeft: i === 0 ? '3px solid #D4AF37' : '3px solid transparent'
            }}>{item}</button>
          ))}
        </nav>
        <div style={{ padding: '24px' }}>
          <button onClick={handleSignOut} style={{
            width: '100%', padding: '12px', background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)', color: '#FAF7F2',
            cursor: 'pointer', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase'
          }}>Sign Out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#1A1A1A', margin: '0 0 8px' }}>Admin Overview</h1>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: 0 }}>LadyVerse platform management</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ background: '#FAF7F2', padding: '24px', borderBottom: '3px solid #1A1A1A' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 12px' }}>{stat.label}</p>
              <p style={{ fontSize: '28px', fontFamily: 'Georgia, serif', color: '#1A1A1A', margin: 0 }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Sellers table */}
        <div style={{ background: '#FAF7F2' }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '14px', fontFamily: 'Georgia, serif', color: '#1A1A1A', margin: 0 }}>Seller Accounts</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F5F0EB' }}>
                {['Category', 'Email', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 28px', textAlign: 'left', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', fontWeight: 'bold' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sellers.map(seller => (
                <tr key={seller.email} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <td style={{ padding: '16px 28px', fontSize: '12px', fontWeight: 'bold', color: '#1A1A1A' }}>{seller.category}</td>
                  <td style={{ padding: '16px 28px', fontSize: '12px', color: '#A68F6D' }}>{seller.email}</td>
                  <td style={{ padding: '16px 28px' }}>
                    <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2D7A4F', background: 'rgba(45,122,79,0.1)', padding: '4px 10px' }}>
                      {seller.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}