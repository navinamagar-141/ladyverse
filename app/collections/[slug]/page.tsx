'use client'

import { useRouter } from 'next/navigation'

export default function CategoryBar() {
  const router = useRouter()

  const categories = [
    { label: 'All Collections', slug: '' },
    { label: 'Fine Jewelry', slug: 'fine-jewelry' },
    { label: 'Luxury Skincare', slug: 'luxury-skincare' },
    { label: 'Designer Fashion', slug: 'designer-fashion' },
    { label: 'Shoes', slug: 'shoes' },
    { label: 'Wellness & Home', slug: 'wellness-home' },
    { label: 'Surprise Gift', slug: 'surprise-gift' },
  ]

  const handleCategory = (slug: string) => {
    if (slug === '') {
      router.push('/')
    } else {
      router.push(`/collections/${slug}`)
    }
  }

  return (
    <div style={{
      position: 'sticky', top: '64px', zIndex: 30,
      width: '100%', height: '48px',
      background: '#FAF7F2',
      borderBottom: '1px solid rgba(212,175,55,0.2)',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: '1152px', margin: '0 auto', width: '100%',
        padding: '0 24px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: '32px', overflowX: 'auto' }}>
          {categories.map((cat) => (
            <button key={cat.slug} onClick={() => handleCategory(cat.slug)} style={{
              whiteSpace: 'nowrap', fontSize: '10px', fontWeight: 'bold',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#1A1A1A', background: 'none', border: 'none',
              cursor: 'pointer', padding: '4px 0',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#631621')}
              onMouseLeave={e => (e.currentTarget.style.color = '#1A1A1A')}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button style={{
          whiteSpace: 'nowrap', fontSize: '10px', fontWeight: 'bold',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#1A1A1A', background: 'none', border: 'none',
          borderBottom: '1px solid #1A1A1A', cursor: 'pointer',
          paddingBottom: '2px', marginLeft: '24px', flexShrink: 0,
        }}>Filter & Sort</button>
      </div>
    </div>
  )
}