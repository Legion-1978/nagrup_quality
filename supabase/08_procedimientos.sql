-- ============================================================
-- NAGRUP QUALITY
-- TABLA: PROCEDIMIENTOS
--
-- Gestiona los procedimientos y documentación del sistema
-- de calidad: versiones, responsables, revisiones,
-- aprobaciones, evidencias y seguimiento.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.procedimientos (
  id TEXT PRIMARY KEY,

  -- Identificación del procedimiento
  codigo TEXT DEFAULT '',
  procedimiento TEXT DEFAULT '',
  version TEXT DEFAULT '',

  -- Responsables y organización
  responsable TEXT DEFAULT '',
  departamento TEXT DEFAULT '',
  propietario TEXT DEFAULT '',
  aprobador TEXT DEFAULT '',

  -- Clasificación
  estado TEXT DEFAULT '',
  criticidad TEXT DEFAULT '',
  tipo TEXT DEFAULT '',
  categoria TEXT DEFAULT '',
  proceso TEXT DEFAULT '',
  riesgo TEXT DEFAULT '',

  -- Control de revisión
  frecuencia_revision TEXT DEFAULT '',

  -- Fechas
  fecha DATE,
  fecha_registro DATE,
  fecha_ultima_revision DATE,
  fecha_revision DATE,
  fecha_proxima_revision DATE,

  -- Seguimiento
  acciones_pendientes NUMERIC DEFAULT 0,
  validado BOOLEAN DEFAULT FALSE,
  observaciones TEXT DEFAULT '',

  -- Evidencias y trazabilidad
  evidencias JSONB DEFAULT '[]'::jsonb,
  comentarios JSONB DEFAULT '[]'::jsonb,
  historial JSONB DEFAULT '[]'::jsonb,

  -- Control interno
  created_at TIMESTAMPTZ DEFAULT now()
);