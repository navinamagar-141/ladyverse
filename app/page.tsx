'use client'

import { Hero } from "./components/organisms/Hero"
import CategoryBar from "./components/organisms/CategoryBar"
import ProductCard from "./components/organisms/ProductCard"
import FeaturedBanner from "./components/organisms/FeaturedBanner"
import BrandSpotlight from "./components/organisms/BrandSpotlight"
import Footer from "./components/organisms/Footer"

export default function Home() {
  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      <Hero />
      <CategoryBar />

      {/* Row 1 */}
      <main id="collections" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <ProductCard brand="Aurum Luxe" name="18K Gold Signature Band" price="45,000" label="Bestseller" />
          <ProductCard brand="Glow Lab" name="Organic Vitamin C Serum" price="3,200" />
          <ProductCard brand="Élan Studio" name="Midnight Velvet Wrap" price="12,500" label="New" />
          <ProductCard brand="Himalayan" name="Rose Water Mist" price="1,800" />
        </div>
      </main>

      <FeaturedBanner />

      {/* Row 2 */}
      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <ProductCard brand="Pure Nepal" name="Hand-Pressed Face Oil" price="2,800" />
          <ProductCard brand="Silk & Stone" name="Silk Charmeuse Scarf" price="7,500" />
          <ProductCard brand="Veda Luxe" name="Botanical Eye Cream" price="4,100" />
          <ProductCard brand="Glow Theory" name="Quartz Face Roller" price="1,950" />
        </div>
      </main>

      {/* Surprise Gift */}
      <section className="bg-white/40 py-24 border-y border-[#D4AF37]/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-serif text-[#631621] mb-4">The Surprise Gift</h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A68F6D]">Contents unknown until delivery. Choose your tier.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            <ProductCard brand="LadyVerse Exclusive" name="Petite Mystery Box" price="5,000" label="SURPRISE" />
            <ProductCard brand="LadyVerse Exclusive" name="Signature Mystery Vault" price="15,000" label="SURPRISE" />
            <ProductCard brand="LadyVerse Exclusive" name="Grand Luxe Chest" price="50,000" label="SURPRISE" />
            <ProductCard brand="LadyVerse Exclusive" name="Elite Mystery Collection" price="100,000" label="SURPRISE" />
          </div>
        </div>
      </section>

      <BrandSpotlight />
      <Footer />
    </div>
  )
}