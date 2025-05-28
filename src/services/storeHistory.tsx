import { supabase } from "../utils/supabaseClient";

export const saveWeatherData = async (weather: {
  city: string;
  humidity: string;
  temperature: string;
  icon: string;
}) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("User not authenticated");

  const { data: existing, error: fetchError } = await supabase
    .from("weather_data")
    .select("id")
    .eq("user_id", user.id)
    .eq("city", weather.city)
    .limit(1)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

  if (existing) {
    const { error: updateError } = await supabase
      .from("weather_data")
      .update({
        humidity: weather.humidity,
        temperature: weather.temperature,
        icon: weather.icon,
        created_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (updateError) throw updateError;
  } else {
    const { error } = await supabase.from("weather_data").insert([
      {
        city: weather.city,
        humidity: weather.humidity,
        temperature: weather.temperature,
        icon: weather.icon,
        user_id: user.id,
      },
    ]);

    if (error) throw error;
  }
};

export const getUserWeatherHistory = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("weather_data")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
