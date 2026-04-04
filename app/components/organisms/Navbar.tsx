'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCartCount } from '@/lib/cart'
import CartDrawer from './CartDrawer'
import { supabase, getUserRole } from '@/lib/supabase'

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [accountLink, setAccountLink] = useState('/login')

  const refresh = () => setCartCount(getCartCount())

  useEffect(() => {
    refresh()
    window.addEventListener('cart-updated', refresh)

    // Check if user is logged in and set correct account link
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setAccountLink('/login'); return }
      const roleData = await getUserRole(user.id)
      if (roleData?.role === 'admin') setAccountLink('/dashboard/admin')
      else if (roleData?.role === 'seller') setAccountLink('/dashboard/seller')
      else setAccountLink('/dashboard/customer')
    }
    checkUser()

    return () => window.removeEventListener('cart-updated', refresh)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 z-40 w-full h-16 bg-[#631621] flex items-center border-b border-[#D4AF37]/20">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 sm:px-6">

          <Link href="/" className="shrink-0 text-xl tracking-[0.12em] text-[#FAF7F2] font-serif italic">
            LadyVerse
          </Link>

          <div className="flex flex-1 justify-center px-4">
            <input
              type="search"
              placeholder="Search jewelry, skincare, fashion..."
              className="w-full max-w-md rounded-full px-6 py-2 text-sm outline-none border bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="flex shrink-0 items-center gap-8 text-[#FAF7F2]">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="hover:opacity-70 transition-opacity relative"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#1A1A1A] rounded-full w-[18px] h-[18px] text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link href={accountLink} aria-label="Account" className="hover:opacity-70 transition-opacity">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}