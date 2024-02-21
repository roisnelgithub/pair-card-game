import { supabase } from "./supabase-client";

export const getAllRecords = async () => {
  const { data, error } = await supabase
    .from("rank")
    .select("*")
    .order("points", { ascending: false });

  return { data, error };
};
export const getMaxScore = async () => {
  const { data, error } = await supabase
    .from("rank")
    .select("*")
    .order("points", { ascending: false })
    .limit(1);
  return { data, error };
};
