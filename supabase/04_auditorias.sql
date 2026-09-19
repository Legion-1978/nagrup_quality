-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 04_auditorias.sql
-- MODULO: AUDITORIAS
-- ============================================================
--
-- DESCRIPCION:
-- Crea la tabla principal utilizada para gestionar las
-- auditorias del sistema de calidad.
--
-- Permite almacenar:
--
--   - Datos generales de la auditoria
--   - Tipo y norma
--   - Auditor y responsable auditado
--   - Alcance y criterios
--   - Fechas
--   - Estado y resultado
--   - Hallazgos
--   - No conformidades
--   - Acciones
--   - Indicadores
--   - Comentarios
--   - Evidencias
--   - Historial
--
-- IMPORTANTE:
--
-- La configuracion RLS y las politicas de seguridad se
-- configuraran posteriormente en:
--
--   13_seguridad_rls.sql
--
-- Los indices se configuraran posteriormente en:
--
--   14_indices.sql
--
-- ============================================================


-- ============================================================
-- TABLA: auditorias
-- ============================================================

CREATE TABLE IF NOT EXISTS public.auditorias (

  -- ----------------------------------------------------------
  -- IDENTIFICACION
  -- ----------------------------------------------------------

  -- Codigo unico de la auditoria.
  --
  -- Ejemplo:
  -- AUD26001

  id TEXT PRIMARY KEY,


  -- ----------------------------------------------------------
  -- INFORMACION GENERAL
  -- ----------------------------------------------------------

  -- Tipo de auditoria.
  --
  -- Ejemplos:
  -- Interna
  -- Externa
  -- Cliente
  -- Proveedor

  tipo TEXT DEFAULT '',


  -- Norma o sistema contra el que se realiza la auditoria.
  --
  -- Ejemplos:
  -- ISO 9001
  -- ISO 14001
  -- ISO 45001

  norma TEXT DEFAULT '',


  -- Persona encargada de realizar la auditoria.

  auditor TEXT DEFAULT '',


  -- Responsable del area, departamento o proceso auditado.

  responsable_auditado TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- PLANIFICACION Y ALCANCE
  -- ----------------------------------------------------------

  -- Define que areas, procesos o actividades estan incluidas
  -- dentro de la auditoria.

  alcance TEXT DEFAULT '',


  -- Criterios utilizados para evaluar el cumplimiento.
  --
  -- Puede incluir normas, procedimientos internos,
  -- requisitos legales, instrucciones, etc.

  criterio_auditoria TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- FECHAS
  -- ----------------------------------------------------------

  -- Fecha principal de realizacion de la auditoria.

  fecha DATE,


  -- Fecha en la que se creo o registro la auditoria.

  fecha_creacion DATE,


  -- Fecha en la que la auditoria quedo oficialmente cerrada.

  fecha_cierre DATE,


  -- ----------------------------------------------------------
  -- ESTADO
  -- ----------------------------------------------------------

  -- Estado actual de la auditoria.
  --
  -- Ejemplos:
  -- Planificada
  -- En curso
  -- Pendiente
  -- Cerrada

  estado TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- RESULTADO Y CONCLUSION
  -- ----------------------------------------------------------

  -- Resultado general de la auditoria.

  resultado TEXT DEFAULT '',


  -- Conclusion final realizada una vez analizados todos
  -- los resultados de la auditoria.

  conclusion TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- HALLAZGOS
  -- ----------------------------------------------------------
  --
  -- Se almacena como JSONB porque una auditoria puede tener
  -- multiples hallazgos.
  --
  -- Ejemplo conceptual:
  --
  -- [
  --   {
  --     "tipo": "Observacion",
  --     "descripcion": "..."
  --   },
  --   {
  --     "tipo": "Oportunidad de mejora",
  --     "descripcion": "..."
  --   }
  -- ]
  --
  -- ----------------------------------------------------------

  hallazgos JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- NO CONFORMIDADES
  -- ----------------------------------------------------------
  --
  -- Lista de las no conformidades detectadas durante
  -- la auditoria.
  --
  -- Se utiliza JSONB porque puede haber multiples NC
  -- asociadas a una misma auditoria.
  --
  -- ----------------------------------------------------------

  no_conformidades JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- ACCIONES
  -- ----------------------------------------------------------
  --
  -- Acciones derivadas de los resultados de la auditoria.
  --
  -- Pueden incluir acciones:
  --
  --   Correctivas
  --   Preventivas
  --   De mejora
  --
  -- ----------------------------------------------------------

  acciones JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- INDICADORES Y SEGUIMIENTO
  -- ----------------------------------------------------------

  -- Numero de acciones que todavia permanecen abiertas.

  acciones_abiertas NUMERIC DEFAULT 0,


  -- Numero de no conformidades que permanecen abiertas.

  nc_abiertas NUMERIC DEFAULT 0,


  -- Numero de dias utilizados para resolver/cerrar
  -- la auditoria o sus acciones asociadas.

  dias_resolucion NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- COMENTARIOS
  -- ----------------------------------------------------------
  --
  -- Permite guardar multiples comentarios relacionados con
  -- la auditoria.
  --
  -- Puede utilizarse para guardar datos como:
  --
  --   autor
  --   fecha
  --   comentario
  --
  -- ----------------------------------------------------------

  comentarios JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- EVIDENCIAS
  -- ----------------------------------------------------------
  --
  -- Permite asociar evidencias o documentos relacionados
  -- con la auditoria.
  --
  -- Por ejemplo:
  --
  --   Fotografias
  --   PDFs
  --   Informes
  --   Documentos
  --   Certificados
  --   Enlaces
  --
  -- ----------------------------------------------------------

  evidencias JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- HISTORIAL
  -- ----------------------------------------------------------
  --
  -- Guarda los diferentes cambios o eventos ocurridos
  -- durante la vida de la auditoria.
  --
  -- Puede utilizarse para registrar:
  --
  --   Cambios de estado
  --   Modificaciones
  --   Validaciones
  --   Cierres
  --   Reaperturas
  --
  -- ----------------------------------------------------------

  historial JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- FECHA TECNICA DE CREACION
  -- ----------------------------------------------------------
  --
  -- Se genera automaticamente en PostgreSQL cuando se
  -- inserta el registro.
  --
  -- A diferencia de "fecha_creacion", este campo incluye
  -- fecha, hora y zona horaria.
  --
  -- ----------------------------------------------------------

  created_at TIMESTAMPTZ DEFAULT now()

);