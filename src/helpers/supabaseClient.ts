import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const URL = "https://tfeztlwsucfyiqfpawiu.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZXp0bHdzdWNmeWlxZnBhd2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MTE3MzAsImV4cCI6MjAyNDA4NzczMH0.sIV9uDchQvqSpUfMX6K8poeK2DGFWQFsSgPif71c7zA";
export const supabase = createClient(URL, API_KEY);
