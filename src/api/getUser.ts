import { supabase } from "../utils/supabase";

export const getUser = async (id: string): Promise<string> => {
  const { data, error } = await supabase
    .from("users")
    .select("name")
    .eq("id", id)
    .single();

  if (error) return "名無し";
  return data.name;
};
