'use client'

import Link from 'next/link'

export default function Footer() {
  const socialIcons = [
    { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
    { label: 'Instagram', path: 'M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6zm-4 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm5.5-11a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z' },
    { label: 'Twitter', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
    { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
    { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
  ]

  return (
    <footer style={{ background: '#FAF7F2', color: '#631621', borderTop: '1px solid rgba(99,22,33,0.1)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '80px 40px 48px' }}>

        {/* 5 Column Grid forced with inline styles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '64px', alignItems: 'start' }}>

          {/* Column 1: Our World */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3em', marginBottom: '32px', textTransform: 'uppercase' }}>Our World</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {["Our Legacy", "New Arrivals", "Store Locator", "Blog", "Sitemap"].map(l => (
                <li key={l} style={{ marginBottom: '16px' }}>
                  <Link href="#" style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.6, textTransform: 'uppercase', textDecoration: 'none', color: '#631621' }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Support & Policy */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3em', marginBottom: '32px', textTransform: 'uppercase' }}>Support & Policy</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {["Contact Us", "FAQ", "Terms & Conditions", "Privacy Policy", "Cookies Policy"].map(l => (
                <li key={l} style={{ marginBottom: '16px' }}>
                  <Link href="#" style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.6, textTransform: 'uppercase', textDecoration: 'none', color: '#631621' }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Brands */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3em', marginBottom: '32px', textTransform: 'uppercase' }}>Brands</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {["Aurum Luxe", "Glow Lab", "Élan Studio", "Veda Luxe", "Pure Nepal", "Silk & Stone", "Glow Theory", "Himalayan"].map(l => (
                <Link key={l} href="#" style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase', textDecoration: 'none', color: '#631621' }}>{l}</Link>
              ))}
            </div>
          </div>

          {/* Column 4: Company Details */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3em', marginBottom: '32px', textTransform: 'uppercase' }}>Company Details</h3>
            <div style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.7, lineHeight: 2.2, textTransform: 'uppercase' }}>
              <p style={{ fontWeight: 'bold', opacity: 1, fontSize: '11px', margin: '0 0 8px' }}>LadyVerse Pvt. Ltd.</p>
              <p style={{ margin: 0 }}>Lakeside-06, Pokhara,</p>
              <p style={{ margin: '0 0 16px' }}>Nepal</p>
              <p style={{ fontWeight: 'bold', opacity: 1, margin: '0 0 4px' }}>+977-9800000000</p>
              <p style={{ fontStyle: 'italic', textTransform: 'lowercase', margin: 0 }}>enquiry@ladyverse.com</p>
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3em', marginBottom: '32px', textTransform: 'uppercase' }}>Newsletter</h3>
            <p style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.6, marginBottom: '24px', textTransform: 'uppercase', lineHeight: 1.8 }}>
              Subscribe to stay updated about new collections, offers and more.
            </p>
            <input
              type="email"
              placeholder="Please Enter Email"
              style={{ width: '100%', background: 'transparent', border: '1px solid rgba(99,22,33,0.3)', padding: '12px 16px', fontSize: '10px', outline: 'none', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#631621', boxSizing: 'border-box' }}
            />
            <button style={{ width: '100%', background: '#631621', color: '#FAF7F2', padding: '12px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.4em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>

        </div>

        {/* Keep In Touch - unchanged */}
        <div style={{ borderTop: '1px solid rgba(99,22,33,0.1)', paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.4em', opacity: 0.4, textTransform: 'uppercase' }}>Keep In Touch</p>
          <div style={{ display: 'flex', gap: '32px', opacity: 0.5 }}>
            {socialIcons.map((icon) => (
              <Link key={icon.label} href="#" aria-label={icon.label} style={{ color: '#631621' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={icon.path} />
                </svg>
              </Link>
            ))}
          </div>
          <p style={{ fontSize: '8px', letterSpacing: '0.5em', opacity: 0.3, textTransform: 'uppercase' }}>
            © 2026 LadyVerse Co. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}