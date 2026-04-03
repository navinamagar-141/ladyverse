'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [isGuest, setIsGuest] = useState(false)

  // 1. THE GATE: Shown if user is not logged in and hasn't chosen Guest
  if (!isGuest) {
    return (
      <div className="min-h-screen bg-[#EBE5D9] flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-[28px] md:text-[36px] font-serif italic text-[#631621] mb-4">
              Checkout
            </h1>
            <div className="w-20 h-[1px] bg-[#631621]/30 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left Side: Member Login */}
            <div className="space-y-8 md:border-r md:border-[#631621]/10 md:pr-16">
              <div className="space-y-2">
                <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#631621]">
                  Society Member
                </h2>
                <p className="text-[11px] uppercase tracking-widest opacity-60">
                  Login for a faster experience
                </p>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-b border-[#631621]/30 py-3 text-[13px] tracking-widest outline-none focus:border-[#631621] transition-colors"
                />
                <input 
                  type="password" 
                  placeholder="PASSWORD" 
                  className="w-full bg-transparent border-b border-[#631621]/30 py-3 text-[13px] tracking-widest outline-none focus:border-[#631621] transition-colors"
                />
              </div>

              <button className="w-full bg-[#631621] text-white py-5 text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all duration-500">
                Sign In & Continue
              </button>
              
              <Link href="#" className="block text-center text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
                Forgot Password?
              </Link>
            </div>

            {/* Right Side: Guest Checkout */}
            <div className="space-y-8 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#631621]">
                  New Guest
                </h2>
                <p className="text-[12px] leading-relaxed tracking-wide opacity-70">
                  No account? No problem. Proceed as a guest and you can choose to join the LadyVerse Society after completing your order.
                </p>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => setIsGuest(true)}
                  className="w-full border border-[#631621] text-[#631621] py-5 text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-[#631621] hover:text-white transition-all duration-500"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 2. THE FORM: Shown after clicking "Continue as Guest"
  return (
    <div className="min-h-screen bg-[#EBE5D9] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-[22px] font-serif italic text-[#631621] mb-12 text-center">
          Shipping Information
        </h2>
        
        {/* Minimalist Shipping Form */}
        <form className="space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <input placeholder="FIRST NAME" className="bg-transparent border-b border-[#631621]/20 py-3 text-[13px] tracking-widest outline-none w-full" />
            <input placeholder="LAST NAME" className="bg-transparent border-b border-[#631621]/20 py-3 text-[13px] tracking-widest outline-none w-full" />
          </div>
          <input placeholder="STREET ADDRESS" className="bg-transparent border-b border-[#631621]/20 py-3 text-[13px] tracking-widest outline-none w-full" />
          <div className="grid grid-cols-2 gap-8">
            <input placeholder="CITY / POKHARA" className="bg-transparent border-b border-[#631621]/20 py-3 text-[13px] tracking-widest outline-none w-full" />
            <input placeholder="PHONE NUMBER" className="bg-transparent border-b border-[#631621]/20 py-3 text-[13px] tracking-widest outline-none w-full" />
          </div>
          
          <button className="w-full bg-[#631621] text-white py-6 text-[12px] font-bold uppercase tracking-[0.4em] mt-12">
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  )
}