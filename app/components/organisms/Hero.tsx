'use client'

import Link from "next/link"

export function Hero() {
  return (
    <section style={{ background: '#FAF7F2', padding: '80px 0 40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(99,22,33,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#D4AF37', margin: '0 0 20px' }}>
              Luxury Women's Marketplace
            </p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '60px', color: '#631621', lineHeight: 1.05, margin: '0 0 20px' }}>
              Discover<br /><span style={{ fontStyle: 'italic' }}>Your Universe</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#6B6B6B', lineHeight: 1.8, margin: '0 0 36px', maxWidth: '420px' }}>
              Fine jewelry, luxury skincare, designer fashion — curated exclusively for the discerning woman.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="#collections" style={{ padding: '14px 32px', background: '#631621', color: '#FAF7F2', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Shop Collections
              </Link>
              <Link href="/signup" style={{ padding: '14px 32px', background: 'transparent', color: '#631621', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 'bold', border: '1px solid rgba(99,22,33,0.4)' }}>
                Create Account
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '48px', marginTop: '40px', paddingTop: '40px', borderTop: '1px solid rgba(99,22,33,0.08)' }}>
              {[{ number: '500+', label: 'Luxury Products' }, { number: '5', label: 'Categories' }, { number: '100%', label: 'Authentic' }].map(b => (
                <div key={b.label}>
                  <p style={{ fontSize: '24px', fontFamily: 'Georgia, serif', color: '#631621', margin: '0 0 4px' }}>{b.number}</p>
                  <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A68F6D', margin: 0 }}>{b.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-8px', background: 'radial-gradient(circle, rgba(212,175,55,0.12), transparent)', filter: 'blur(20px)' }} />
            <div style={{ position: 'relative', background: '#fff', border: '1px solid rgba(212,175,55,0.3)', padding: '32px', boxShadow: '0 20px 60px rgba(99,22,33,0.06)' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 20px' }}>Featured This Season</p>
              {[
                { category: 'Fine Jewelry', name: '18K Gold Signature Band', price: 'NPR 45,000' },
                { category: 'Luxury Skincare', name: 'Organic Vitamin C Serum', price: 'NPR 3,200' },
                { category: 'Designer Fashion', name: 'Midnight Velvet Wrap', price: 'NPR 12,500' },
                { category: 'Shoes', name: 'Embossed Leather Mules', price: 'NPR 8,900' },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(99,22,33,0.06)' : 'none' }}>
                  <div>
                    <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 3px' }}>{item.category}</p>
                    <p style={{ fontSize: '13px', fontFamily: 'Georgia, serif', color: '#1A1A1A', margin: 0 }}>{item.name}</p>
                  </div>
                  <p style={{ fontSize: '13px', fontFamily: 'Georgia, serif', color: '#631621', margin: 0, paddingLeft: '16px', flexShrink: 0 }}>{item.price}</p>
                </div>
              ))}
              <div style={{ marginTop: '20px', height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }} />
              <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#A68F6D', textAlign: 'center', marginTop: '14px', textTransform: 'uppercase' }}>New arrivals every week</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}