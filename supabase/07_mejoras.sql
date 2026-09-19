-- ============================================================
-- NAGRUP QUALITY
-- TABLA: MEJORAS
--
-- Gestiona las acciones y proyectos de mejora continua:
-- objetivos, responsables, costes, ahorros, indicadores,
-- seguimiento, evidencias y validación de eficacia.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.mejoras (
  id TEXT PRIMARY KEY,

  -- Información general
  titulo TEXT DEFAULT '',
  descripcion TEXT DEFAULT '',
  estado TEXT DEFAULT '',
  tipo TEXT DEFAULT '',
  origen TEXT DEFAULT '',

  -- Organización
  area TEXT DEFAULT '',
  proceso TEXT DEFAULT '',
  departamento TEXT DEFAULT '',
  responsable TEXT DEFAULT '',
  patrocinador TEXT DEFAULT '',

  -- Clasificación de la mejora
  prioridad TEXT DEFAULT '',
  impacto TEXT DEFAULT '',
  categoria TEXT DEFAULT '',
  subcategoria TEXT DEFAULT '',
  norma TEXT DEFAULT '',
  clasificacion TEXT DEFAULT '',
  riesgo TEXT DEFAULT '',
  oportunidad TEXT DEFAULT '',

  -- Objetivos y auditoría
  kpi TEXT DEFAULT '',
  objetivo TEXT DEFAULT '',
  auditor TEXT DEFAULT '',
  estado_auditoria TEXT DEFAULT '',
  aprobacion_direccion BOOLEAN DEFAULT FALSE,

  -- Información adicional
  centro_logistico TEXT DEFAULT '',
  beneficio_cualitativo TEXT DEFAULT '',
  accion_propuesta TEXT DEFAULT '',
  causa_origen TEXT DEFAULT '',

  -- Indicadores
  indicador TEXT DEFAULT '',
  unidad_indicador TEXT DEFAULT '',
  valor_inicial TEXT DEFAULT '',
  valor_objetivo TEXT DEFAULT '',
  valor_actual TEXT DEFAULT '',
  porcentaje_avance NUMERIC DEFAULT 0,

  -- Información económica
  beneficio NUMERIC DEFAULT 0,
  ahorro_estimado NUMERIC DEFAULT 0,
  ahorro_real NUMERIC DEFAULT 0,
  coste_proyecto NUMERIC DEFAULT 0,

  -- Fechas
  fecha_registro DATE,
  fecha_creacion DATE,
  fecha_inicio DATE,
  fecha_objetivo DATE,
  fecha_implantacion DATE,
  fecha_validacion DATE,
  fecha_ultima_revision DATE,
  fecha_cierre DATE,

  -- Cierre y seguimiento
  observaciones TEXT DEFAULT '',
  validacion_eficacia TEXT DEFAULT '',
  resultado TEXT DEFAULT '',
  acciones_pendientes NUMERIC DEFAULT 0,
  dias_resolucion NUMERIC DEFAULT 0,

  -- Archivos, comentarios e historial
  evidencias JSONB DEFAULT '[]'::jsonb,
  comentarios JSONB DEFAULT '[]'::jsonb,
  historial JSONB DEFAULT '[]'::jsonb,

  -- Estado final
  validada BOOLEAN DEFAULT FALSE,
  cerrada BOOLEAN DEFAULT FALSE,

  -- Control interno
  created_at TIMESTAMPTZ DEFAULT now()
);