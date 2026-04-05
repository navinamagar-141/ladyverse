'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getUserRole } from '@/lib/supabase'

type Tab = 'dashboard' | 'products' | 'add-product' | 'orders' | 'pos' | 'analytics' | 'settings'

export default function SellerDashboard() {
  const [category, setCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [productForm, setProductForm] = useState({
    name: '', price: '', description: '', stock: '', sku: ''
  })
  const [productSaved, setProductSaved] = useState(false)
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

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('products').insert({
      name: productForm.name,
      price: parseFloat(productForm.price),
      description: productForm.description,
      stock: parseInt(productForm.stock),
      sku: productForm.sku,
      category: category,
      vendor_id: user.id,
      created_at: new Date().toISOString()
    })

    if (!error) {
      setProductSaved(true)
      setProductForm({ name: '', price: '', description: '', stock: '', sku: '' })
      setTimeout(() => setProductSaved(false), 3000)
    }
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

  const navItems: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'My Products' },
    { id: 'add-product', label: '+ Add Product' },
    { id: 'orders', label: 'Orders' },
    { id: 'pos', label: 'POS System' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0EB', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{ width: '240px', background: '#631621', color: '#FAF7F2', display: 'flex', flexDirection: 'column', flexShrink: 0, minHeight: '100vh', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: 0 }}>LadyVerse</p>
          <p style={{ fontSize: '9px', letterSpacing: '0.25em', opacity: 0.6, textTransform: 'uppercase', margin: '6px 0 0' }}>Seller Portal</p>
        </div>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', opacity: 0.5, textTransform: 'uppercase', margin: '0 0 4px' }}>Your Category</p>
          <p style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{category}</p>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              width: '100%', textAlign: 'left', padding: '13px 24px',
              background: activeTab === item.id ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: 'none', color: activeTab === item.id ? '#FAF7F2' : 'rgba(255,255,255,0.7)',
              cursor: 'pointer', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              borderLeft: activeTab === item.id ? '3px solid #D4AF37' : '3px solid transparent'
            }}>{item.label}</button>
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
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 8px' }}>Welcome, {category} Seller</h1>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: 0 }}>Here's your store overview</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {stats.map(stat => (
                <div key={stat.label} style={{ background: '#FAF7F2', padding: '24px', borderBottom: '3px solid #631621' }}>
                  <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 12px' }}>{stat.label}</p>
                  <p style={{ fontSize: '28px', fontFamily: 'Georgia, serif', color: '#631621', margin: 0 }}>{stat.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#FAF7F2', padding: '40px', textAlign: 'center', border: '1px dashed rgba(99,22,33,0.2)' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#631621', margin: '0 0 8px' }}>No products listed yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: '0 0 28px' }}>Add your first {category} product to start selling</p>
              <button onClick={() => setActiveTab('add-product')} style={{ padding: '14px 40px', background: '#631621', color: '#FAF7F2', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold' }}>
                + Add Product
              </button>
            </div>
          </div>
        )}

        {/* ADD PRODUCT TAB */}
        {activeTab === 'add-product' && (
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 8px' }}>Add New Product</h1>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: 0 }}>Category: {category}</p>
            </div>

            {productSaved && (
              <div style={{ background: 'rgba(45,122,79,0.1)', border: '1px solid rgba(45,122,79,0.3)', padding: '16px 20px', marginBottom: '24px', color: '#2D7A4F', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                ✓ Product saved successfully!
              </div>
            )}

            <form onSubmit={handleProductSubmit}>
              <div style={{ background: '#FAF7F2', padding: '40px', maxWidth: '640px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                  <div>
                    <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Product Name *</label>
                    <input
                      type="text" required
                      value={productForm.name}
                      onChange={e => setProductForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. 18K Gold Signature Ring"
                      style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.2)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Price (NPR) *</label>
                      <input
                        type="number" required
                        value={productForm.price}
                        onChange={e => setProductForm(p => ({ ...p, price: e.target.value }))}
                        placeholder="45000"
                        style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.2)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Stock Quantity *</label>
                      <input
                        type="number" required
                        value={productForm.stock}
                        onChange={e => setProductForm(p => ({ ...p, stock: e.target.value }))}
                        placeholder="10"
                        style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.2)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>SKU / Product Code</label>
                    <input
                      type="text"
                      value={productForm.sku}
                      onChange={e => setProductForm(p => ({ ...p, sku: e.target.value }))}
                      placeholder="LV-JWL-001"
                      style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.2)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={e => setProductForm(p => ({ ...p, description: e.target.value }))}
                      placeholder="Describe your product..."
                      rows={4}
                      style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.2)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>

                  <button type="submit" style={{ padding: '16px', background: '#631621', color: '#FAF7F2', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    Save Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* MY PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: 0 }}>My Products</h1>
              <button onClick={() => setActiveTab('add-product')} style={{ padding: '12px 24px', background: '#631621', color: '#FAF7F2', border: 'none', cursor: 'pointer', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 'bold' }}>
                + Add New
              </button>
            </div>
            <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#631621', margin: '0 0 8px' }}>No products yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>Your listed products will appear here</p>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 32px' }}>Orders</h1>
            <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#631621', margin: '0 0 8px' }}>No orders yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>Customer orders will appear here</p>
            </div>
          </div>
        )}

        {/* POS SYSTEM TAB */}
        {activeTab === 'pos' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 8px' }}>POS System</h1>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase', margin: 0 }}>Point of Sale — walk-in customers</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
              {/* Products panel */}
              <div style={{ background: '#FAF7F2', padding: '32px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 20px' }}>Select Products</p>
                <div style={{ background: '#F5F0EB', padding: '40px', textAlign: 'center', border: '1px dashed rgba(99,22,33,0.2)' }}>
                  <p style={{ fontSize: '13px', color: '#A68F6D', fontFamily: 'Georgia, serif' }}>Add products first to use POS</p>
                </div>
              </div>
              {/* Cart panel */}
              <div style={{ background: '#FAF7F2', padding: '32px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 20px' }}>Current Sale</p>
                <div style={{ minHeight: '200px', borderBottom: '1px solid rgba(99,22,33,0.1)', marginBottom: '20px' }}>
                  <p style={{ fontSize: '12px', color: '#A68F6D', textAlign: 'center', paddingTop: '60px' }}>No items added</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A1A' }}>Total</span>
                  <span style={{ fontSize: '18px', fontFamily: 'Georgia, serif', color: '#631621' }}>NPR 0</span>
                </div>
                <button style={{ width: '100%', padding: '16px', background: '#631621', color: '#FAF7F2', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Complete Sale
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 32px' }}>Analytics</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {[
                { label: 'This Week', value: 'NPR 0' },
                { label: 'This Month', value: 'NPR 0' },
                { label: 'All Time', value: 'NPR 0' },
              ].map(s => (
                <div key={s.label} style={{ background: '#FAF7F2', padding: '24px', borderBottom: '3px solid #631621' }}>
                  <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 12px' }}>{s.label}</p>
                  <p style={{ fontSize: '24px', fontFamily: 'Georgia, serif', color: '#631621', margin: 0 }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#FAF7F2', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#631621', margin: '0 0 8px' }}>No sales data yet</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>Analytics will appear once you start selling</p>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#631621', margin: '0 0 32px' }}>Settings</h1>
            <div style={{ background: '#FAF7F2', padding: '32px', maxWidth: '500px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Store Category</label>
                  <input disabled value={category} style={{ width: '100%', padding: '14px 16px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(99,22,33,0.1)', outline: 'none', fontSize: '13px', color: '#A68F6D', boxSizing: 'border-box', cursor: 'not-allowed' }} />
                </div>
                <div>
                  <label style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A68F6D', display: 'block', marginBottom: '8px' }}>Contact Email</label>
                  <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: '1px solid rgba(99,22,33,0.2)', outline: 'none', fontSize: '13px', color: '#1A1A1A', boxSizing: 'border-box' }} />
                </div>
                <button style={{ padding: '14px', background: '#631621', color: '#FAF7F2', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold' }}>
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