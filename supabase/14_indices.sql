-- ============================================================
-- NAGRUP QUALITY
-- PERMISO RPC: SIGUIENTE_CORRELATIVO
--
-- Permite que la aplicación pueda ejecutar la función
-- siguiente_correlativo() utilizando los roles:
-- anon y authenticated.
-- ============================================================

GRANT EXECUTE
ON FUNCTION public.siguiente_correlativo(TEXT, TEXT)
TO anon, authenticated;