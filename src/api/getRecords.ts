import { supabase } from "../utils/supabase";

export const getRecords = async (): Promise<object[]> => {
  const { data, error } = await supabase.rpc("get_match_details");
  if (error) return [];

  return data;
};
