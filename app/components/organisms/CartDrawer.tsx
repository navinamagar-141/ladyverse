'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, removeFromCart, updateQuantity, getCartCount, CartItem } from '@/lib/cart'

interface Props {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: Props) {
  const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()

  const refresh = () => setCart(getCart())

  useEffect(() => {
    refresh()
    window.addEventListener('cart-updated', refresh)
    return () => window.removeEventListener('cart-updated', refresh)
  }, [])

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/,/g, ''))
    return sum + price * item.quantity
  }, 0)

  const handleCheckout = () => {
    onClose()
    router.push('/login?intent=checkout')
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#EBE5D9] shadow-2xl z-[101] transform transition-transform duration-500 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full text-black">

          {/* Header */}
          <div className="flex items-center justify-between px-8 py-8 border-b border-[#631621]/10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#A68F6D] mb-1">Your Bag</p>
              <h2 className="text-[18px] font-serif italic text-[#631621]">
                {cart.length === 0 ? 'Empty' : `${getCartCount()} Item${getCartCount() > 1 ? 's' : ''}`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[24px] hover:rotate-90 transition-transform duration-300 text-[#631621]"
            >
              ✕
            </button>
          </div>

          {/* Empty state */}
          {cart.length === 0 && (
            <div className="flex-grow flex flex-col items-center justify-center text-center px-8">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-60">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A68F6D] mb-8">Your bag is empty</p>
              <button
                onClick={onClose}
                className="text-[11px] font-bold uppercase tracking-[0.3em] border-b border-[#631621] pb-1 text-[#631621] hover:opacity-60 transition-opacity"
              >
                Continue Browsing
              </button>
            </div>
          )}

          {/* Cart items */}
          {cart.length > 0 && (
            <div className="flex-grow overflow-y-auto px-8 py-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 pb-6 mb-6 border-b border-[#631621]/10">
                  {/* Placeholder image */}
                  <div className="w-[72px] h-[88px] bg-[#D9D0C1] flex-shrink-0 rounded-sm" />

                  <div className="flex-1">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#A68F6D] mb-1">{item.brand}</p>
                    <p className="text-[13px] font-serif text-[#1A1A1A] mb-3">{item.name}</p>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 border border-[#631621]/30 text-[#631621] text-lg flex items-center justify-center hover:bg-[#631621] hover:text-white transition-colors"
                      >
                        −
                      </button>
                      <span className="text-[12px] text-[#1A1A1A] min-w-[16px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 border border-[#631621]/30 text-[#631621] text-lg flex items-center justify-center hover:bg-[#631621] hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <p className="text-[13px] font-serif text-[#631621]">
                      NPR {(parseFloat(item.price.replace(/,/g, '')) * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[9px] uppercase tracking-[0.15em] text-[#A68F6D] underline hover:text-[#631621] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-[#631621]/10 px-8 py-6">
              <div className="flex justify-between items-center mb-5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]">Total</span>
                <span className="text-[18px] font-serif text-[#631621]">NPR {total.toLocaleString()}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#631621] text-[#FAF7F2] py-4 text-[11px] font-bold tracking-[0.4em] uppercase hover:opacity-90 transition-opacity"
              >
                Proceed to Pay
              </button>
              <p className="text-center text-[9px] uppercase tracking-[0.2em] text-[#A68F6D] mt-3">
              Sign in required to place order
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  )
}