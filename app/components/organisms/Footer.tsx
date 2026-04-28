'use client'

import Link from 'next/link'

export default function Footer() {
  const socialIcons = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/ladyverse.fashion/',
      path: 'M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6zm-4 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm5.5-11a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z'
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@navinamagar-video/shorts',
      path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z'
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@ladyverse.co',
      path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z'
    },
  ]

  const ourWorldLinks = [
    { label: 'Our Legacy', href: '/about' },
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'Fine Jewelry', href: '/collections/fine-jewelry' },
    { label: 'Designer Fashion', href: '/collections/designer-fashion' },
    { label: 'Sitemap', href: '/sitemap' },
  ]

  const supportLinks = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookies Policy', href: '/cookies' },
  ]

  const brandLinks = [
    { label: 'Aurum Luxe', href: '/collections/fine-jewelry' },
    { label: 'Glow Lab', href: '/collections/luxury-skincare' },
    { label: 'Élan Studio', href: '/collections/designer-fashion' },
    { label: 'Veda Luxe', href: '/collections/luxury-skincare' },
    { label: 'Pure Nepal', href: '/collections/wellness-home' },
    { label: 'Silk & Stone', href: '/collections/wellness-home' },
    { label: 'Glow Theory', href: '/collections/luxury-skincare' },
    { label: 'Himalayan', href: '/collections/wellness-home' },
  ]

  return (
    <footer style={{ background: '#FAF7F2', color: '#631621', borderTop: '1px solid rgba(99,22,33,0.1)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '80px 40px 48px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '64px', alignItems: 'start' }}>

          {/* Column 1: Our World */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3em', marginBottom: '32px', textTransform: 'uppercase' }}>Our World</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {ourWorldLinks.map(l => (
                <li key={l.label} style={{ marginBottom: '16px' }}>
                  <Link href={l.href} style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.6, textTransform: 'uppercase', textDecoration: 'none', color: '#631621', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Support & Policy */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3em', marginBottom: '32px', textTransform: 'uppercase' }}>Support & Policy</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {supportLinks.map(l => (
                <li key={l.label} style={{ marginBottom: '16px' }}>
                  <Link href={l.href} style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.6, textTransform: 'uppercase', textDecoration: 'none', color: '#631621' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Brands */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.3em', marginBottom: '32px', textTransform: 'uppercase' }}>Brands</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {brandLinks.map(l => (
                <Link key={l.label} href={l.href} style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase', textDecoration: 'none', color: '#631621' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                >{l.label}</Link>
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
              <a href="tel:+9779800000000" style={{ display: 'block', fontWeight: 'bold', opacity: 1, margin: '0 0 4px', color: '#631621', textDecoration: 'none' }}>+977-9800000000</a>
              <a href="mailto:enquiry@ladyverse.com" style={{ fontStyle: 'italic', textTransform: 'lowercase', margin: 0, color: '#631621', textDecoration: 'none' }}>enquiry@ladyverse.com</a>
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
            <button style={{ width: '100%', background: '#631621', color: '#FAF7F2', padding: '12px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.4em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Subscribe
            </button>
          </div>

        </div>

        {/* Keep In Touch */}
        <div style={{ borderTop: '1px solid rgba(99,22,33,0.1)', paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.4em', opacity: 0.4, textTransform: 'uppercase', margin: 0 }}>Keep In Touch</p>
          <div style={{ display: 'flex', gap: '32px' }}>
            {socialIcons.map((icon) => (
              <Link
                key={icon.label}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.label}
                style={{ color: '#631621', opacity: 0.5, transition: 'opacity 0.2s, transform 0.2s', display: 'flex' }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '0.5'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={icon.path} />
                </svg>
              </Link>
            ))}
          </div>
          <p style={{ fontSize: '8px', letterSpacing: '0.5em', opacity: 0.3, textTransform: 'uppercase', margin: 0 }}>
            © 2026 LadyVerse Co. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}