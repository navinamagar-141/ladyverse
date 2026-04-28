'use client'

import { use } from 'react'
import ProductCard from '@/app/components/organisms/ProductCard'
import CategoryBar from '@/app/components/organisms/CategoryBar'
import Footer from '@/app/components/organisms/Footer'

const allProducts: Record<string, { brand: string; name: string; price: string; label?: string; category: string }[]> = {
  'fine-jewelry': [
    { brand: 'Aurum Luxe', name: '18K Gold Signature Band', price: '45,000', label: 'Bestseller', category: 'Fine Jewelry' },
    { brand: 'Aurum Luxe', name: 'Diamond Solitaire Pendant', price: '85,000', label: 'New', category: 'Fine Jewelry' },
    { brand: 'Aurum Luxe', name: 'Rose Gold Bangle Set', price: '32,000', category: 'Fine Jewelry' },
    { brand: 'Aurum Luxe', name: 'Pearl Drop Earrings', price: '18,500', category: 'Fine Jewelry' },
    { brand: 'Aurum Luxe', name: 'Sapphire Tennis Bracelet', price: '125,000', label: 'Exclusive', category: 'Fine Jewelry' },
    { brand: 'Aurum Luxe', name: 'Gold Chain Necklace', price: '28,000', category: 'Fine Jewelry' },
    { brand: 'Aurum Luxe', name: 'Emerald Ring', price: '95,000', category: 'Fine Jewelry' },
    { brand: 'Aurum Luxe', name: 'Diamond Stud Earrings', price: '55,000', category: 'Fine Jewelry' },
  ],
  'luxury-skincare': [
    { brand: 'Glow Lab', name: 'Organic Vitamin C Serum', price: '3,200', category: 'Luxury Skincare' },
    { brand: 'Veda Luxe', name: 'Botanical Eye Cream', price: '4,100', label: 'Bestseller', category: 'Luxury Skincare' },
    { brand: 'Himalayan', name: 'Rose Water Mist', price: '1,800', category: 'Luxury Skincare' },
    { brand: 'Pure Nepal', name: 'Hand-Pressed Face Oil', price: '2,800', label: 'New', category: 'Luxury Skincare' },
    { brand: 'Glow Theory', name: 'Quartz Face Roller', price: '1,950', category: 'Luxury Skincare' },
    { brand: 'Glow Lab', name: 'Retinol Night Cream', price: '5,500', category: 'Luxury Skincare' },
    { brand: 'Veda Luxe', name: 'Hyaluronic Acid Toner', price: '2,200', category: 'Luxury Skincare' },
    { brand: 'Pure Nepal', name: 'Saffron Face Mask', price: '1,600', category: 'Luxury Skincare' },
  ],
  'designer-fashion': [
    { brand: 'Élan Studio', name: 'Midnight Velvet Wrap', price: '12,500', label: 'New', category: 'Designer Fashion' },
    { brand: 'Élan Studio', name: 'Silk Slip Dress', price: '18,000', label: 'Bestseller', category: 'Designer Fashion' },
    { brand: 'Élan Studio', name: 'Cashmere Coat', price: '45,000', label: 'Exclusive', category: 'Designer Fashion' },
    { brand: 'Élan Studio', name: 'Linen Blazer', price: '14,500', category: 'Designer Fashion' },
    { brand: 'Élan Studio', name: 'Printed Maxi Skirt', price: '8,900', category: 'Designer Fashion' },
    { brand: 'Élan Studio', name: 'Structured Handbag', price: '32,000', category: 'Designer Fashion' },
    { brand: 'Élan Studio', name: 'Pleated Trousers', price: '9,500', category: 'Designer Fashion' },
    { brand: 'Élan Studio', name: 'Embroidered Blouse', price: '7,800', category: 'Designer Fashion' },
  ],
  'shoes': [
    { brand: 'Stride Luxe', name: 'Embossed Leather Mules', price: '8,900', label: 'Bestseller', category: 'Shoes' },
    { brand: 'Stride Luxe', name: 'Strappy Heeled Sandals', price: '11,500', label: 'New', category: 'Shoes' },
    { brand: 'Stride Luxe', name: 'Patent Leather Pumps', price: '14,000', category: 'Shoes' },
    { brand: 'Stride Luxe', name: 'Suede Ankle Boots', price: '16,500', category: 'Shoes' },
    { brand: 'Stride Luxe', name: 'Ballet Flats', price: '6,800', category: 'Shoes' },
    { brand: 'Stride Luxe', name: 'Platform Loafers', price: '9,200', category: 'Shoes' },
    { brand: 'Stride Luxe', name: 'Woven Espadrilles', price: '5,500', category: 'Shoes' },
    { brand: 'Stride Luxe', name: 'Block Heel Mules', price: '7,900', category: 'Shoes' },
  ],
  'wellness-home': [
    { brand: 'Silk & Stone', name: 'Silk Charmeuse Scarf', price: '7,500', category: 'Wellness & Home' },
    { brand: 'Glow Theory', name: 'Quartz Face Roller', price: '1,950', label: 'Bestseller', category: 'Wellness & Home' },
    { brand: 'Himalayan', name: 'Himalayan Salt Lamp', price: '3,200', category: 'Wellness & Home' },
    { brand: 'Veda Luxe', name: 'Aromatherapy Candle Set', price: '2,800', label: 'New', category: 'Wellness & Home' },
    { brand: 'Pure Nepal', name: 'Organic Herbal Tea Set', price: '1,500', category: 'Wellness & Home' },
    { brand: 'Silk & Stone', name: 'Silk Pillowcase Set', price: '4,200', category: 'Wellness & Home' },
    { brand: 'Himalayan', name: 'Crystal Diffuser', price: '5,800', category: 'Wellness & Home' },
    { brand: 'Veda Luxe', name: 'Meditation Kit', price: '3,900', category: 'Wellness & Home' },
  ],
  'surprise-gift': [
    { brand: 'LadyVerse Exclusive', name: 'Petite Mystery Box', price: '5,000', label: 'SURPRISE', category: 'Surprise Gift' },
    { brand: 'LadyVerse Exclusive', name: 'Signature Mystery Vault', price: '15,000', label: 'SURPRISE', category: 'Surprise Gift' },
    { brand: 'LadyVerse Exclusive', name: 'Grand Luxe Chest', price: '50,000', label: 'SURPRISE', category: 'Surprise Gift' },
    { brand: 'LadyVerse Exclusive', name: 'Elite Mystery Collection', price: '100,000', label: 'SURPRISE', category: 'Surprise Gift' },
  ],
}

const categoryNames: Record<string, string> = {
  'all': 'All Collections',
  'fine-jewelry': 'Fine Jewelry',
  'luxury-skincare': 'Luxury Skincare',
  'designer-fashion': 'Designer Fashion',
  'shoes': 'Shoes',
  'wellness-home': 'Wellness & Home',
  'surprise-gift': 'Surprise Gift',
}

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const products = slug === 'all'
    ? Object.values(allProducts).flat()
    : allProducts[slug] || []

  const categoryName = categoryNames[slug] || 'Collections'

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      <CategoryBar />

      {/* Header */}
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 24px 32px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#D4AF37', margin: '0 0 12px' }}>
          Collections
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: '#631621', margin: '0 0 8px' }}>
          {categoryName}
        </h1>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A68F6D', margin: 0 }}>
          {products.length} Products
        </p>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: '1px', background: 'linear-gradient(to right, #631621, transparent)', marginBottom: '48px' }} />
      </div>

      {/* Products grid */}
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px 80px' }}>
        {products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px 24px' }}>
            {products.map((product, i) => (
              <ProductCard key={i} brand={product.brand} name={product.name} price={product.price} label={product.label} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#631621', margin: '0 0 12px' }}>No products yet</p>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#A68F6D', textTransform: 'uppercase' }}>Check back soon</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}