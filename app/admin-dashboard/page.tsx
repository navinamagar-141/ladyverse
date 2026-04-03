'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [vendors, setVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // 1. Check Authentication on Load
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin-login')
      } else {
        setIsAuthenticated(true)
        fetchVendors()
      }
    }
    checkUser()
  }, [router])

  // 2. Fetch Vendors from Supabase
  const fetchVendors = async () => {
    setLoading(true)
    
    // We select 'id' as well so we can use it for the 'Reject' button key
    const { data, error } = await supabase
      .from('vendors')
      .select('id, brand_name, category, created_at') 
      .order('created_at', { ascending: false })

    if (!error && data) {
      setVendors(data)
    } else if (error) {
      console.error("Supabase Error:", error.message)
    }
    setLoading(false)
  }

  // 3. Delete/Reject Vendor Logic
  const deleteVendor = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to remove this vendor?")
    if (!confirmed) return

    const { error } = await supabase
      .from('vendors')
      .delete()
      .eq('id', id)

    if (!error) {
      // Update local state so the row disappears immediately
      setVendors(vendors.filter(v => v.id !== id))
    } else {
      alert("Error deleting vendor: " + error.message)
    }
  }

  // 4. Logout Logic
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin-login')
  }

  // Loading State while verifying session
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#A68F6D] animate-pulse">
          Verifying Credentials...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 border-b border-[#D4AF37]/20 pb-8">
          <div>
            <h1 className="text-3xl font-serif italic text-[#631621]">Management Console</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A68F6D] mt-2 font-bold">
              LadyVerse Partner Pipeline
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={fetchVendors}
              className="text-[9px] uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#631621] transition-colors"
            >
              Refresh List
            </button>
            
            <button 
              onClick={handleSignOut}
              className="bg-[#631621] text-white px-6 py-2 text-[9px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#4d111a] transition-all"
            >
              Secure Logout
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow-sm border border-[#EAE3D5] overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-[10px] uppercase tracking-widest text-[#A68F6D]">
              Updating Dashboard...
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F2EDE4] border-b border-[#EAE3D5]">
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">Vendor Name</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">Category</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">Application Date</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EDE4]">
                {vendors.length > 0 ? (
                  vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="p-6 text-sm font-serif text-[#1A1A1A]">
                        {vendor.brand_name || "Unnamed Brand"}
                      </td>
                      <td className="p-6 text-[11px] text-[#A68F6D] font-medium uppercase tracking-wider">
                        {vendor.category || "General"}
                      </td>
                      <td className="p-6 text-[11px] text-[#1A1A1A]/60">
                        {new Date(vendor.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => deleteVendor(vendor.id)}
                          className="text-[10px] font-bold uppercase tracking-widest text-red-700 hover:text-red-900 transition-colors"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-sm text-[#A68F6D] italic">
                      No active applications found in the "vendors" table.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}