'use client'
import { IoBagOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex flex-col shadow-sm">
      {/* Top Maroon Bar - 72px */}
      <div className="bg-[#631621] text-[#FAF7F2] h-[72px] flex items-center px-10">
        {/* Spacer: Replaces LadyVerse to keep search centered */}
        <div className="flex-1"></div>
        
        {/* Center: Search Bar */}
        <div className="flex-[2] relative max-w-lg">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
          <input 
            type="text" 
            placeholder="Search jewelry, skincare, fashion..." 
            className="w-full bg-white/10 rounded-full py-2.5 pl-12 pr-6 text-[11px] tracking-wide outline-none border border-white/20 focus:bg-white/20 placeholder:text-white/60"
          />
        </div>

        {/* Right: Icons */}
        <div className="flex-1 flex justify-end gap-10 items-center">
          <IoPersonOutline size={22} className="cursor-pointer opacity-90 hover:opacity-100 transition-all" />
          <IoBagOutline size={22} className="cursor-pointer opacity-90 hover:opacity-100 transition-all" />
        </div>
      </div>

      {/* Category Bar - 72px */}
      <div className="bg-[#FAF7F2] h-[72px] border-b border-[#631621]/10 flex items-center justify-center">
        <nav className="flex gap-12 text-[11px] font-bold tracking-[0.25em] text-[#631621] uppercase">
          {["All Collections", "Fine Jewelry", "Luxury Skincare", "Designer Fashion", "Shoes", "Wellness & Home", "Surprise Gift"].map((item) => (
            <a key={item} href="#" className="hover:opacity-50 transition-all whitespace-nowrap">{item}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}