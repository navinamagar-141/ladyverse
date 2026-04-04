'use client'

import { addToCart } from '@/lib/cart'

interface Props {
  brand: string
  name: string
  price: string
  label?: string
}

export default function ProductCard({ brand, name, price, label }: Props) {
  const id = `${brand}-${name}`.toLowerCase().replace(/\s+/g, '-')

  const handleAdd = () => {
    addToCart({ id, brand, name, price })
  }

  return (
    <div className="flex flex-col group">
      {/* Image area */}
      <div className="relative bg-[#EDE8E0] overflow-hidden" style={{ aspectRatio: '3/4' }}>
        {label && (
          <span className="absolute top-3 left-3 bg-[#FAF7F2] text-[#1A1A1A] text-[9px] font-bold tracking-[0.2em] px-3 py-1 uppercase z-10">
            {label}
          </span>
        )}
        {/* Add to Bag button — always visible */}
        <button
          onClick={handleAdd}
          className="absolute bottom-0 left-0 right-0 bg-[#631621] text-[#FAF7F2] py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
        >
          Add to Bag
        </button>
      </div>

      {/* Info */}
      <div className="pt-4">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#A68F6D] mb-1">{brand}</p>
        <p className="text-[14px] font-serif text-[#1A1A1A] mb-2">{name}</p>
        <p className="text-[13px] font-serif text-[#631621]">NPR {price}</p>
      </div>
    </div>
  )
}