'use client'

import Link from 'next/link'

export default function CheckoutButton() {
  return (
    <div className="w-full space-y-4 px-6 py-8 bg-white border-t border-[#631621]/10">
      {/* Editorial Summary */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 text-black">Subtotal</span>
        <span className="text-[14px] font-serif italic text-[#631621]">Calculated at checkout</span>
      </div>

      {/* The LadyVerse Branded Button */}
      <Link href="/checkout" className="block w-full">
        <button className="w-full bg-[#631621] text-white py-5 px-8 text-[12px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:bg-black hover:tracking-[0.35em] group flex justify-center items-center gap-3">
          <span>Proceed to Checkout</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1 text-lg">→</span>
        </button>
      </Link>

      {/* Trust Signifier */}
      <p className="text-[9px] text-center uppercase tracking-[0.2em] opacity-40 font-medium text-black">
        Secure Checkout • Handcrafted in Nepal
      </p>
    </div>
  )
}