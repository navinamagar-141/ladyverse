'use client'

export default function FeaturedBanner() {
  return (
    <section className="my-20 w-full bg-[#EAE3D5] overflow-hidden">
      <div className="flex flex-col md:flex-row items-center">
        {/* Editorial Text Side */}
        <div className="w-full md:w-1/2 p-12 md:p-24 space-y-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#A68F6D] font-bold">
            Season's Essential
          </p>
          <h2 className="text-4xl md:text-5xl font-serif italic text-[#631621] leading-tight">
            The Radiance <br /> Collection
          </h2>
          <p className="text-sm text-[#1A1A1A]/70 max-w-md leading-relaxed font-light">
            Discover a curated selection of organic serums and hand-crafted 18K gold accents designed for the modern woman who values sustainability and luxury.
          </p>
          <button className="mt-4 px-10 py-4 border border-[#631621] text-[#631621] text-[10px] font-bold uppercase tracking-widest hover:bg-[#631621] hover:text-white transition-all duration-500">
            Explore the Edit
          </button>
        </div>

        {/* Image Side - Placeholder for your high-res editorial shot */}
        <div className="w-full md:w-1/2 h-[500px] bg-[#D9D1C3] flex items-center justify-center relative">
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#A68F6D]">Editorial Image</span>
            {/* When you have an image: <img src="/editorial.jpg" className="object-cover w-full h-full" /> */}
        </div>
      </div>
    </section>
  );
}