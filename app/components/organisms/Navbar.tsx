'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-40 w-full h-16 bg-[#631621] flex items-center border-b border-[#D4AF37]/20">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        {/* <Link href="/" className="shrink-0 text-xl tracking-[0.12em] text-[#FAF7F2] font-serif italic">
          LadyVerse
        </Link> */}
        <div className="flex flex-1 justify-center px-4">
          <input
            type="search"
            placeholder="Search jewelry, skincare, fashion..."
            className="w-full max-w-md rounded-full px-6 py-2 text-sm outline-none border bg-white/10 border-white/20 text-white placeholder:text-white/40"
          />
        </div>
        <div className="flex shrink-0 items-center gap-8 text-[#FAF7F2]">
          {/* Cart Icon */}
          <button aria-label="Cart" className="hover:opacity-70 transition-opacity">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
          {/* Account Icon */}
          <Link href="/login" aria-label="Account" className="hover:opacity-70 transition-opacity">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}