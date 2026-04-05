'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getUserRole } from '@/lib/supabase'

type Tab = 'overview' | 'sellers' | 'customers' | 'orders' | 'products' | 'settings'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [customers, setCustomers] = useState<{ id: string; email: string; created_at: string }[]>([])
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
    { category: 'Fine Jewelry', email: 'jewelry@ladyverse.com', products: 0, orders: 0, status: 'Active' },
    { category: 'Luxury Skincare', email: 'skincare@ladyverse.com', products: 0, orders: 0, status: 'Active' },
    { category: 'Designer Fashion', email: 'fashion@ladyverse.com', products: 0, orders: 0, status: 'Active' },
    { category: 'Shoes', email: 'shoes@ladyverse.com', products: 0, orders: 0, status: 'Active' },
    { category: 'Wellness & Home', email: 'wellness@ladyverse.com', products: 0, orders: 0, status: 'Active' },
  ]

  const navItems: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'sellers', label: 'Sellers' },
    { id: 'customers', label: 'Customers' },
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0EB', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{ width: '240px', background: '#1A1A1A', color: '#FAF7F2', display: 'flex', flexDirection: 'column', flexShrink: 0, minHeight: '100vh', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: 0 }}>LadyVerse</p>
          <p style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.4, textTransform: 'uppercase', margin: '6px 0 0' }}>Admin Console</p>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              width: '100%', textAlign: 'left', padding: '13px 24px',
              background: activeTab === item.id ? 'rgba(255,255,255,0.07)' : 'transparent',
              border: 'none', color: activeTab === item.id ? '#FAF7F2' : 'rgba(255,255,255,0.6)',
              cursor: 'pointer', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              borderLeft: activeTab === item.id ? '3px solid #D4AF37' : '3px solid transparent'
            }}>{item.label}</button>
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
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#1A1A1A', margin: '0 0 8px' }}>Admin Overview</h1>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: 0 }}>LadyVerse platform management</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {stats.map(stat => (
                <div key={stat.label} style={{ background: '#FAF7F2', padding: '24px', borderBottom: '3px solid #1A1A1A' }}>
                  <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 12px' }}>{stat.label}</p>
                  <p style={{ fontSize: '28px', fontFamily: 'Georgia, serif', color: '#1A1A1A', margin: 0 }}>{stat.value}</p>
                </div>
              ))}
            </div>
            {/* Quick links */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { label: 'Manage Sellers', desc: 'View and control seller accounts', tab: 'sellers' as Tab },
                { label: 'View Orders', desc: 'All platform orders', tab: 'orders' as Tab },
                { label: 'All Products', desc: 'Browse all listed products', tab: 'products' as Tab },
              ].map(card => (
                <button key={card.label} onClick={() => setActiveTab(card.tab)} style={{ background: '#FAF7F2', padding: '24px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                  <p style={{ fontSize: '13px', fontFamily: 'Georgia, serif', color: '#1A1A1A', margin: '0 0 8px' }}>{card.label}</p>
                  <p style={{ fontSize: '10px', color: '#A68F6D', margin: 0 }}>{card.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SELLERS */}
        {activeTab === 'sellers' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#1A1A1A', margin: '0 0 32px' }}>Seller Accounts</h1>
            <div style={{ background: '#FAF7F2' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F5F0EB' }}>
                    {['Category', 'Email', 'Products', 'Orders', 'Status', 'Action'].map(h => (
                      <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', fontWeight: 'bold' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellers.map(seller => (
                    <tr key={seller.email} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                      <td style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', color: '#1A1A1A' }}>{seller.category}</td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#A68F6D' }}>{seller.email}</td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#1A1A1A' }}>{seller.products}</td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#1A1A1A' }}>{seller.orders}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2D7A4F', background: 'rgba(45,122,79,0.1)', padding: '4px 10px' }}>{seller.status}</span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <button style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#631621', background: 'none', border: '1px solid rgba(99,22,33,0.3)', padding: '4px 12px', cursor: 'pointer' }}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CUSTOMERS */}
        {activeTab === 'customers' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#1A1A1A', margin: '0 0 32px' }}>Customers</h1>
            <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#1A1A1A', margin: '0 0 8px' }}>No customers yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>Customer accounts will appear here once they sign up</p>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#1A1A1A', margin: '0 0 32px' }}>All Orders</h1>
            <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#1A1A1A', margin: '0 0 8px' }}>No orders yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>All platform orders will appear here</p>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#1A1A1A', margin: '0 0 32px' }}>All Products</h1>
            <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#1A1A1A', margin: '0 0 8px' }}>No products listed yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>Products added by sellers will appear here</p>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#1A1A1A', margin: '0 0 32px' }}>Platform Settings</h1>
            <div style={{ background: '#FAF7F2', padding: '32px', maxWidth: '500px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Platform Name</label>
                  <input defaultValue="LadyVerse" style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Contact Email</label>
                  <input defaultValue="admin@ladyverse.com" style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }} />
                </div>
                <button style={{ padding: '14px', background: '#1A1A1A', color: '#FAF7F2', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}