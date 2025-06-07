import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables: SUPABASE_URL and SUPABASE_KEY are required"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("count")
      .limit(1);
    if (error) throw error;
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
};
