'use client'

interface ProductProps {
  name: string;
  brand: string;
  price: string;
  label?: string; 
}

export default function ProductCard({ name, brand, price, label }: ProductProps) {
  return (
    <div className="group cursor-pointer">
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EDE4] mb-4 shadow-sm">
        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-[#A68F6D] uppercase tracking-[0.3em] px-4 text-center">
          LadyVerse Collection
        </div>
        
        {label && (
          <div className="absolute top-4 left-4 bg-white px-2 py-1 text-[9px] uppercase tracking-widest font-bold shadow-sm z-10">
            {label}
          </div>
        )}

        {/* PERMANENTLY VISIBLE BUTTON */}
        <div className="absolute inset-0 flex items-end p-4 transition-all duration-300 group-hover:bg-[#631621]/5">
          <button className="w-full bg-[#631621] py-3.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg hover:bg-[#4d111a] transition-colors">
            Quick View
          </button>
        </div>
      </div>
      
      {/* Product Information */}
      <div className="space-y-1 px-1">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#A68F6D] font-bold">{brand}</p>
        <h3 className="text-sm font-serif text-[#1A1A1A] group-hover:text-[#631621] transition-colors leading-tight">
          {name}
        </h3>
        <p className="text-sm font-medium text-[#1A1A1A] pt-1 tracking-tight">NPR {price}</p>
      </div>
    </div>
  );
}