import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

// console.log(process.env.REACT_APP_SUPABASE_URL);

const supabaseUrl = SUPABASE_URL
const supabaseKey = SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;
