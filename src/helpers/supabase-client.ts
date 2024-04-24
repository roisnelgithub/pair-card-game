import { createClient } from "@supabase/supabase-js";

//No se puedo crear la Tabla con el RLS de políticas de seguridad.

const URL = "https://tfeztlwsucfyiqfpawiu.supabase.co";
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(URL, API_KEY);
