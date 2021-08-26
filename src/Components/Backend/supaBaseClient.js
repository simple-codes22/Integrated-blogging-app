import { createClient } from '@supabase/supabase-js';
// require('dotenv').config();

const supabaseUrl = "https://lwjgteyoakzezinsxgxr.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODUxOTY5OCwiZXhwIjoxOTQ0MDk1Njk4fQ.MnYxO_bSLC9GzCVDSf9xaNFyukinvGj_IVJDozqcFlg"

const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;