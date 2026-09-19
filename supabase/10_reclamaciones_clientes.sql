-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 10_reclamaciones_clientes.sql
-- MODULO: RECLAMACIONES DE CLIENTES
-- ============================================================
--
-- DESCRIPCION:
-- Crea la tabla utilizada para gestionar las reclamaciones
-- recibidas de clientes.
--
-- Permite almacenar:
--
--   - Identificacion de la reclamacion
--   - Cliente
--   - Responsable
--   - Descripcion
--   - Fechas
--   - Estado
--   - Gravedad
--   - Costes y compensaciones
--   - Tiempo de resolucion
--   - Producto
--   - Pedido
--   - Lote
--   - Analisis de causa raiz
--   - Accion correctiva
--   - Validacion
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
-- TABLA: reclamaciones_clientes
-- ============================================================

CREATE TABLE IF NOT EXISTS public.reclamaciones_clientes (

  -- ----------------------------------------------------------
  -- IDENTIFICACION
  -- ----------------------------------------------------------
  --
  -- Codigo unico de la reclamacion.
  --
  -- Ejemplo:
  --
  -- REC26001
  -- REC26002
  --
  -- Puede generarse utilizando el sistema de correlativos
  -- configurado en:
  --
  --   03_contadores.sql
  --
  -- ----------------------------------------------------------

  id TEXT PRIMARY KEY,


  -- ----------------------------------------------------------
  -- CLIENTE
  -- ----------------------------------------------------------

  -- Nombre o identificacion del cliente que realiza
  -- la reclamacion.

  cliente TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- RESPONSABLE
  -- ----------------------------------------------------------

  -- Persona interna responsable de gestionar
  -- la reclamacion.

  responsable TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- DESCRIPCION
  -- ----------------------------------------------------------

  -- Descripcion detallada del problema comunicado
  -- por el cliente.

  descripcion TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- FECHAS
  -- ----------------------------------------------------------

  -- Fecha en la que se recibe o produce la reclamacion.

  fecha DATE,


  -- Fecha en la que se crea el registro dentro
  -- de NAGRUP Quality.

  fecha_creacion DATE,


  -- Fecha en la que la reclamacion queda oficialmente
  -- cerrada.

  fecha_cierre DATE,


  -- ----------------------------------------------------------
  -- ESTADO
  -- ----------------------------------------------------------
  --
  -- Estado actual de la reclamacion.
  --
  -- Ejemplos conceptuales:
  --
  -- Abierta
  -- En investigacion
  -- En proceso
  -- Pendiente
  -- Pendiente de validacion
  -- Cerrada
  --
  -- ----------------------------------------------------------

  estado TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- GRAVEDAD
  -- ----------------------------------------------------------
  --
  -- Nivel de gravedad de la reclamacion.
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
  -- COSTE
  -- ----------------------------------------------------------
  --
  -- Coste economico generado por la reclamacion.
  --
  -- ----------------------------------------------------------

  coste NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- COMPENSACION
  -- ----------------------------------------------------------
  --
  -- Importe de la compensacion economica realizada
  -- al cliente, si existe.
  --
  -- Puede utilizarse para registrar:
  --
  --   Abonos
  --   Descuentos
  --   Reembolsos
  --   Compensaciones
  --
  -- ----------------------------------------------------------

  compensacion NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- TIEMPO DE RESOLUCION
  -- ----------------------------------------------------------
  --
  -- Numero de dias empleados para resolver
  -- la reclamacion.
  --
  -- ----------------------------------------------------------

  dias_resolucion NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- PRODUCTO
  -- ----------------------------------------------------------

  -- Producto o referencia relacionada con
  -- la reclamacion.

  producto TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- PEDIDO
  -- ----------------------------------------------------------

  -- Numero o codigo del pedido relacionado
  -- con la reclamacion.

  pedido TEXT DEFAULT '',


-- ----------------------------------------------------------
-- LOTE
-- ----------------------------------------------------------

-- Lote relacionado con el producto reclamado.

lote TEXT DEFAULT '',


-- ----------------------------------------------------------
-- ANALISIS DE CAUSA RAIZ
-- ----------------------------------------------------------
--
-- Resultado de la investigacion realizada para determinar
-- la causa real que origino la reclamacion.
--
-- ----------------------------------------------------------

causa_raiz TEXT DEFAULT '',


-- ----------------------------------------------------------
-- ACCION CORRECTIVA
-- ----------------------------------------------------------
--
-- Accion implantada para eliminar la causa del problema
-- y evitar que vuelva a producirse.
--
-- ----------------------------------------------------------

accion_correctiva TEXT DEFAULT '',


-- ----------------------------------------------------------
-- VALIDACION
-- ----------------------------------------------------------
--
-- Indica si la reclamacion y las acciones realizadas han
-- sido revisadas y validadas.
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
-- Permite almacenar multiples comentarios relacionados
-- con la reclamacion.
--
-- ----------------------------------------------------------

comentarios JSONB DEFAULT '[]'::jsonb,


-- ----------------------------------------------------------
-- EVIDENCIAS
-- ----------------------------------------------------------
--
-- Permite almacenar evidencias relacionadas con
-- la reclamacion.
--
-- Por ejemplo:
--
-- Fotografias
-- Documentos
-- PDFs
-- Informes
-- Correos
-- Archivos
-- Enlaces
--
-- ----------------------------------------------------------

evidencias JSONB DEFAULT '[]'::jsonb,


-- ----------------------------------------------------------
-- HISTORIAL
-- ----------------------------------------------------------
--
-- Guarda la trazabilidad de los cambios realizados
-- durante la gestion de la reclamacion.
--
-- Puede registrar:
--
-- Creacion
-- Cambio de estado
-- Cambio de responsable
-- Investigacion
-- Accion correctiva
-- Validacion
-- Cierre
-- Reapertura
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
-- ----------------------------------------------------------

created_at TIMESTAMPTZ DEFAULT now()

);