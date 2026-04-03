'use client'

export default function CategoryBar() {
  return (
    /* 1. sticky top-0: Makes the bar stick to the top edge when you scroll.
       2. z-50: Sets it above the Navbar (z-40) so it covers it.
       3. h-[72px]: Sets the specific height you requested.
    */
   <div className="sticky top-0 z-50 w-full h-[72px] bg-[#FAF7F2] border-b border-[#631621]/10 flex items-center justify-center">
      <nav className="flex gap-12 text-[11px] font-bold tracking-[0.25em] text-[#631621] uppercase whitespace-nowrap overflow-x-auto px-6">
        {["All Collections", "Fine Jewelry", "Luxury Skincare", "Designer Fashion", "Shoes", "Wellness & Home", "Surprise Gift"].map((item) => (
          <a 
            key={item} 
            href={`/category/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
            className="hover:opacity-50 transition-opacity"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  )
}