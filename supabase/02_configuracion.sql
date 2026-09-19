-- ============================================================
-- NAGRUP QUALITY
-- TABLA: CONFIGURACION
--
-- Guarda la configuración general del dashboard
-- y el registro de actividad reciente.
--
-- La aplicación utiliza una única fila:
-- id = 'app'
-- ============================================================

CREATE TABLE IF NOT EXISTS public.configuracion (
  id TEXT PRIMARY KEY,
  dashboard JSONB DEFAULT '{}'::jsonb,
  actividad JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);