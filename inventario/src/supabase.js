import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yurowwwyspzunxrqxdxl.supabase.co'
const supabaseKey = 'sb_publishable_jB4d6e0bYpIA0An-ynISBQ_5ArCP4xN'

export const supabase = createClient(supabaseUrl, supabaseKey)
