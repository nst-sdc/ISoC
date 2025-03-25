import { Database } from './database.types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pxpjuzjghlmrvkhtlzyo.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase }; // Ensure supabase is exported
