'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function VendorOnboarding() {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Find this section in your handleSubmit function
const { error } = await supabase
.from('vendors') // MUST be 'vendors' to match your screenshot
.insert([
  {
    brand_name: formData.get('brandName'),
    category: formData.get('category'),
    contact_person: formData.get('contact'),
    brand_story: formData.get('story'),
  }
])

    setLoading(false)
    
    if (error) {
      alert("Error: " + error.message)
    } else {
      setShowSuccess(true)
      // Reset the form after success
      ;(e.target as HTMLFormElement).reset()
      
      // Hide the message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-20 relative">
      
      {/* SUCCESS POP-UP (TOAST) */}
      {showSuccess && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-[#631621] text-white px-8 py-4 shadow-2xl border border-[#D4AF37]/30 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Application Sent Successfully</span>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center mb-12">
           <h1 className="text-4xl font-serif italic text-[#631621] mb-2">Partner with LadyVerse</h1>
           <p className="text-[10px] uppercase tracking-[0.3em] text-[#A68F6D] font-bold">
            Expand your brand to a global audience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 shadow-sm border border-[#EAE3D5] space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-[#1A1A1A]">Brand Name</label>
              <input name="brandName" required className="w-full bg-[#FAF7F2] border-none p-4 text-sm focus:ring-1 focus:ring-[#631621] outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-[#1A1A1A]">Business Category</label>
              <select name="category" className="w-full bg-[#FAF7F2] border-none p-4 text-sm focus:ring-1 focus:ring-[#631621] outline-none appearance-none">
                <option>Fine Jewelry</option>
                <option>Luxury Skincare</option>
                <option>Designer Fashion</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-[#1A1A1A]">Contact Person</label>
              <input name="contact" required className="w-full bg-[#FAF7F2] border-none p-4 text-sm focus:ring-1 focus:ring-[#631621] outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-[#1A1A1A]">Brand Story</label>
              <textarea name="story" className="w-full bg-[#FAF7F2] border-none p-4 text-sm focus:ring-1 focus:ring-[#631621] outline-none" rows={4} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#631621] py-4 text-white uppercase tracking-widest text-[10px] font-bold shadow-lg hover:bg-[#4d111a] transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  )
}