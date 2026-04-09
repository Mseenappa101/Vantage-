import { supabase } from './supabase'

// ——————————————————————————————————————————
// SECTION WAITLIST
// ——————————————————————————————————————————

export async function addToWaitlist(email) {
  const { data, error } = await supabase
    .from('waitlist_subscribers')
    .insert([{ email }])
    .select()

  return { data, error }
}
