'use client'

export default function BrandSpotlight() {
  const brands = [
    { name: "Aurum Luxe", origin: "Kathmandu" },
    { name: "Glow Lab", origin: "Pokhara" },
    { name: "Élan Studio", origin: "Lalitpur" },
    { name: "Himalayan", origin: "Manang" },
    { name: "Silk & Stone", origin: "Bhaktapur" }
  ];

  return (
    <section className="py-20 border-t border-[#D4AF37]/10 bg-[#FAF7F2]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#A68F6D] font-bold">
            Our Curated Partners
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center group">
              <span className="text-xl font-serif text-[#1A1A1A] group-hover:text-[#631621] transition-colors">
                {brand.name}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-[#A68F6D] mt-1">
                {brand.origin}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}