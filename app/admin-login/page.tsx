'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      router.push('/admin-dashboard')
    } else {
      alert("Access Denied: Invalid Credentials")
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="bg-white p-10 shadow-sm border border-[#EAE3D5] w-full max-w-md space-y-6">
        <h1 className="text-2xl font-serif italic text-[#631621] text-center">Admin Access</h1>
        <input 
          type="email" 
          placeholder="CEO Email" 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#FAF7F2] p-4 text-sm outline-none" 
        />
        <input 
          type="password" 
          placeholder="Security Code" 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#FAF7F2] p-4 text-sm outline-none" 
        />
        <button className="w-full bg-[#631621] py-4 text-white uppercase tracking-widest text-[10px] font-bold">
          Enter Console
        </button>
      </form>
    </div>
  )
}