import { supabase } from "./supabase-client";

const TABLE_NAME = "ranks";
const COLUMN_SCORE = "score";
export const getAllRecords = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order(COLUMN_SCORE, { ascending: false });

  return { data, error };
};
export const getMaxScore = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order(COLUMN_SCORE, { ascending: false })
    .limit(1);
  return { data, error };
};

export const insertScore = async (name: string, score: number) => {
  const { error } = await supabase.from(TABLE_NAME).insert({ name, score });

  return error;
};

export const getAllGreaterThan = async (value: number) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .gt(COLUMN_SCORE, value);

  return { data, error };
};
