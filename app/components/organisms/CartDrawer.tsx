'use client'

import { useState } from 'react'
import CheckoutButton from '../atoms/CheckoutButton'

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <>
      {/* THE TRIGGER: This is what sits in your Navbar */}
      <button 
        onClick={toggleDrawer}
        className="text-[#FAF7F2] hover:opacity-80 transition-opacity flex items-center p-2"
        aria-label="Open Cart"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6" cy="19" r="2" />
          <circle cx="17" cy="19" r="2" />
          <path d="M17 17h-11v-14h-2" />
          <path d="M6 5l14 1l-1 7h-13" />
        </svg>
      </button>

      {/* THE OVERLAY: Darkens screen */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          onClick={toggleDrawer}
        />
      )}

      {/* THE DRAWER: High Z-Index to ensure it's on top */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#EBE5D9] shadow-2xl z-[101] transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex flex-col h-full text-black">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-8 border-b border-[#631621]/10">
            <h2 className="text-[18px] font-serif italic text-[#631621]">Your Selection</h2>
            <button 
              onClick={toggleDrawer}
              className="text-[24px] hover:rotate-90 transition-transform duration-300"
            >
              ✕
            </button>
          </div>

          {/* Cart Items Area */}
          <div className="flex-grow overflow-y-auto px-8 py-12 flex flex-col items-center justify-center text-center">
            <p className="text-[12px] uppercase tracking-[0.2em] opacity-40 mb-6">Your cart is currently empty</p>
            <button 
              onClick={toggleDrawer}
              className="text-[11px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 hover:text-[#631621] hover:border-[#631621] transition-all"
            >
              Continue Browsing
            </button>
          </div>

          {/* Footer with Checkout Atom */}
          <div className="border-t border-[#631621]/10">
            <CheckoutButton />
          </div>
        </div>
      </div>
    </>
  )
}