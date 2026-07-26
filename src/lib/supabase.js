import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_KEY

if (!url || !key) throw new Error('Missing Supabase credentials in .env')

export const supabase = createClient(url, key)

export const getProfile = async (userId) => {
  const { data } = await supabase.from('profiles').select('name').eq('id', userId).single()
  return data
}