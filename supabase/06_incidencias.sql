-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 06_incidencias.sql
-- MODULO: INCIDENCIAS
-- ============================================================
--
-- DESCRIPCION:
-- Crea la tabla principal utilizada para gestionar las
-- incidencias y no conformidades internas de la organizacion.
--
-- Permite almacenar:
--
--   - Identificacion de la incidencia
--   - Fecha y lugar
--   - Area y proceso
--   - Categoria y origen
--   - Producto / SKU afectado
--   - Cantidad afectada
--   - Problema detectado
--   - Gravedad
--   - Estado
--   - Responsable
--   - Impacto economico
--   - Analisis de causa raiz
--   - Recurrencia
--   - Acciones inmediatas
--   - Acciones correctivas
--   - Acciones preventivas
--   - Seguimiento
--   - Cierre
--   - Revision y validacion
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
-- TABLA: incidencias
-- ============================================================

CREATE TABLE IF NOT EXISTS public.incidencias (

  -- ----------------------------------------------------------
  -- IDENTIFICACION
  -- ----------------------------------------------------------
  --
  -- Codigo unico de la incidencia.
  --
  -- Ejemplo:
  --
  -- INC26001
  -- INC26002
  --
  -- Puede generarse utilizando el sistema de correlativos
  -- configurado en:
  --
  --   03_contadores.sql
  --
  -- ----------------------------------------------------------

  id TEXT PRIMARY KEY,


  -- ----------------------------------------------------------
  -- FECHAS INICIALES
  -- ----------------------------------------------------------

  -- Fecha en la que ocurrio o se detecto la incidencia.

  fecha DATE,


  -- Fecha en la que se registro la incidencia
  -- dentro de la aplicacion.

  fecha_creacion DATE,


  -- ----------------------------------------------------------
  -- LOCALIZACION / ORGANIZACION
  -- ----------------------------------------------------------

  -- Area en la que se produjo o detecto la incidencia.

  area TEXT DEFAULT '',


  -- Proceso relacionado con la incidencia.

  proceso TEXT DEFAULT '',


  -- Turno en el que se produjo la incidencia.
  --
  -- Ejemplos:
  --
  -- Mañana
  -- Tarde
  -- Noche

  turno TEXT DEFAULT '',


  -- Ubicacion fisica donde se produjo la incidencia.

  ubicacion TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- CLASIFICACION
  -- ----------------------------------------------------------

  -- Categoria principal de la incidencia.

  categoria TEXT DEFAULT '',


  -- Subcategoria para realizar una clasificacion
  -- mas detallada.

  subcategoria TEXT DEFAULT '',


  -- Origen de la incidencia.
  --
  -- Ejemplos:
  --
  -- Produccion
  -- Almacen
  -- Transporte
  -- Control de calidad
  -- Auditoria
  -- Cliente
  --
  -- ----------------------------------------------------------

  origen TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- PRODUCTO AFECTADO
  -- ----------------------------------------------------------

  -- Codigo SKU o referencia del producto relacionado
  -- con la incidencia.

  sku TEXT DEFAULT '',


  -- Cantidad de producto afectada.

  cantidad_afectada NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- DESCRIPCION DEL PROBLEMA
  -- ----------------------------------------------------------

  -- Descripcion principal de la incidencia o problema
  -- detectado.

  problema TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- GRAVEDAD
  -- ----------------------------------------------------------
  --
  -- Indica el nivel de importancia de la incidencia.
  --
  -- Ejemplos:
  --
  -- Baja
  -- Media
  -- Alta
  -- Critica
  --
  -- ----------------------------------------------------------

  gravedad TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ESTADO
  -- ----------------------------------------------------------
  --
  -- Estado actual de la incidencia.
  --
  -- Ejemplos:
  --
  -- Abierta
  -- En investigacion
  -- En proceso
  -- Pendiente
  -- Cerrada
  --
  -- ----------------------------------------------------------

  estado TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- RESPONSABLE
  -- ----------------------------------------------------------

  -- Persona responsable de gestionar o resolver
  -- la incidencia.

  responsable TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- IMPACTO ECONOMICO
  -- ----------------------------------------------------------

  -- Coste o impacto economico relacionado con
  -- la incidencia.

  impacto_economico NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- ANALISIS DE CAUSA RAIZ
  -- ----------------------------------------------------------

  -- Resultado del analisis realizado para determinar
  -- la causa que genero el problema.

  causa_raiz TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- RECURRENCIA
  -- ----------------------------------------------------------
  --
  -- Indica si el problema ya habia ocurrido anteriormente.
  --
  -- FALSE = No recurrente
  -- TRUE  = Recurrente
  --
  -- ----------------------------------------------------------

  recurrencia BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- ACCION INMEDIATA
  -- ----------------------------------------------------------
  --
  -- Medida adoptada inmediatamente despues de detectar
  -- la incidencia para contener o limitar el problema.
  --
  -- ----------------------------------------------------------

  accion_inmediata TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ACCION CORRECTIVA
  -- ----------------------------------------------------------
  --
  -- Accion destinada a eliminar la causa del problema
  -- para evitar que vuelva a producirse.
  --
  -- ----------------------------------------------------------

  accion_correctiva TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ACCION PREVENTIVA
  -- ----------------------------------------------------------
  --
  -- Accion destinada a prevenir problemas similares
  -- o reducir riesgos futuros.
  --
  -- ----------------------------------------------------------

  accion_preventiva TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- SEGUIMIENTO DE ACCIONES
  -- ----------------------------------------------------------

  -- Numero de acciones relacionadas con la incidencia
  -- que todavia permanecen abiertas.

  acciones_abiertas NUMERIC DEFAULT 0,


  -- Fecha limite o comprometida para resolver la incidencia.

  fecha_compromiso DATE,


  -- ----------------------------------------------------------
  -- CIERRE
  -- ----------------------------------------------------------

  -- Fecha en la que la incidencia queda oficialmente cerrada.

  fecha_cierre DATE,


  -- Numero de dias utilizados para resolver la incidencia.

  dias_resolucion NUMERIC DEFAULT 0,


  -- Descripcion o conclusion realizada al cerrar
  -- la incidencia.

  descripcion_cierre TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- REVISION
  -- ----------------------------------------------------------
  --
  -- Indica si la incidencia ha sido revisada.
  --
  -- FALSE = pendiente de revision
  -- TRUE  = revisada
  --
  -- ----------------------------------------------------------

  revisada BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- VALIDACION
  -- ----------------------------------------------------------
  --
  -- Indica si la solucion o cierre ha sido validado.
  --
  -- FALSE = no validada
  -- TRUE  = validada
  --
  -- ----------------------------------------------------------

  validada BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- COMENTARIOS
  -- ----------------------------------------------------------
  --
  -- Guarda multiples comentarios relacionados con
  -- la incidencia.
  --
  -- Se almacena como JSONB porque pueden existir varios
  -- comentarios asociados al mismo registro.
  --
  -- Ejemplo conceptual:
  --
  -- [
  --   {
  --     "autor": "Usuario",
  --     "fecha": "2026-09-18",
  --     "comentario": "Pendiente de revision"
  --   }
  -- ]
  --
  -- ----------------------------------------------------------

  comentarios JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- EVIDENCIAS
  -- ----------------------------------------------------------
  --
  -- Permite asociar evidencias relacionadas con
  -- la incidencia.
  --
  -- Por ejemplo:
  --
  --   Fotografias
  --   Documentos
  --   Informes
  --   PDFs
  --   Archivos
  --   Enlaces
  --
  -- ----------------------------------------------------------

  evidencias JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- HISTORIAL
  -- ----------------------------------------------------------
  --
  -- Guarda la trazabilidad de los cambios realizados
  -- durante la vida de la incidencia.
  --
  -- Puede utilizarse para registrar:
  --
  --   Creacion
  --   Cambio de responsable
  --   Cambio de estado
  --   Modificacion de acciones
  --   Revision
  --   Validacion
  --   Cierre
  --   Reapertura
  --
  -- ----------------------------------------------------------

  historial JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- FECHA TECNICA DE CREACION
  -- ----------------------------------------------------------
  --
  -- PostgreSQL asigna automaticamente la fecha y hora
  -- cuando se crea el registro.
  --
  -- Incluye zona horaria.
  --
  -- ----------------------------------------------------------

  created_at TIMESTAMPTZ DEFAULT now()

);