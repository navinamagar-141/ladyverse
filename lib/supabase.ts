import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'customer' | 'seller' | 'admin'

export async function getUserRole(userId: string): Promise<{ role: UserRole; category?: string } | null> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role, category')
    .eq('id', userId)
    .single()

  if (error || !data) return null
  return { role: data.role as UserRole, category: data.category }
}