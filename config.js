/**
 * Configuración de entorno.
 *
 * Prefijo EXPO_PUBLIC_ (Expo / Metro). Si no hay variables de entorno,
 * se usan los valores del proyecto Nagrup para no dejar la app sin backend.
 */

export const CONFIG = {
  SUPABASE_URL:
    process.env.EXPO_PUBLIC_SUPABASE_URL ||
    "https://bszekbfwvaqqxvtdrmwg.supabase.co",
  SUPABASE_ANON_KEY:
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_lEI1QnCdiRHfINrd50u9uA_0RgXjKoA",
};