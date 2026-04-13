'use client'

import { useRouter } from 'next/navigation'
import { addToCart } from '@/lib/cart'

interface Props {
  brand: string
  name: string
  price: string
  label?: string
}

export default function ProductCard({ brand, name, price, label }: Props) {
  const id = `${brand}-${name}`.toLowerCase().replace(/\s+/g, '-')
  const router = useRouter()

  const handleAddToCart = () => {
    addToCart({ id, brand, name, price })
  }

  const handleBuyNow = () => {
    addToCart({ id, brand, name, price })
    router.push('/login?intent=checkout')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Image area */}
      <div style={{ position: 'relative', background: '#EDE8E0', aspectRatio: '3/4', overflow: 'hidden' }}>
        {label && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            background: '#FAF7F2', color: '#1A1A1A',
            fontSize: '9px', fontWeight: 'bold',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            padding: '4px 10px', zIndex: 1
          }}>
            {label}
          </span>
        )}

        {/* Two buttons side by side at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'grid', gridTemplateColumns: '1fr 1fr',
        }}>
          <button
            onClick={handleAddToCart}
            style={{
              background: '#631621', color: '#FAF7F2',
              border: 'none', borderRight: '1px solid rgba(255,255,255,0.2)',
              padding: '14px 8px', fontSize: '9px',
              fontWeight: 'bold', letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Add to Bag
          </button>
          <button
            onClick={handleBuyNow}
            style={{
              background: '#D4AF37', color: '#1A1A1A',
              border: 'none', padding: '14px 8px',
              fontSize: '9px', fontWeight: 'bold',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Product info */}
      <div style={{ paddingTop: '14px' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A68F6D', margin: '0 0 4px' }}>{brand}</p>
        <p style={{ fontSize: '14px', fontFamily: 'Georgia, serif', color: '#1A1A1A', margin: '0 0 6px' }}>{name}</p>
        <p style={{ fontSize: '13px', fontFamily: 'Georgia, serif', color: '#631621', margin: 0 }}>NPR {price}</p>
      </div>

    </div>
  )
}