-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 12_entregas_otif.sql
-- MODULO: ENTREGAS OTIF
-- ============================================================
--
-- DESCRIPCION:
-- Crea la tabla utilizada para controlar el cumplimiento
-- de las entregas realizadas a clientes.
--
-- OTIF significa:
--
--   ON TIME = Entregado a tiempo
--   IN FULL = Entregado completamente
--
-- Una entrega se considera OTIF cuando cumple simultaneamente:
--
--   ON TIME = TRUE
--   IN FULL = TRUE
--
-- Permite almacenar:
--
--   - Identificacion del registro
--   - Cliente
--   - Pedido
--   - Fecha prevista de entrega
--   - Fecha real de entrega
--   - Cantidad pedida
--   - Cantidad entregada
--   - Motivo de incumplimiento
--   - Transportista
--   - Cumplimiento On Time
--   - Cumplimiento In Full
--   - Cumplimiento OTIF
--   - Fecha de registro
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
-- TABLA: entregas_otif
-- ============================================================

CREATE TABLE IF NOT EXISTS public.entregas_otif (


  -- ----------------------------------------------------------
  -- IDENTIFICACION
  -- ----------------------------------------------------------
  --
  -- Codigo unico del registro de entrega.
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
  --
  -- Nombre o identificacion del cliente al que corresponde
  -- la entrega.
  --
  -- ----------------------------------------------------------

  cliente TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- PEDIDO
  -- ----------------------------------------------------------
  --
  -- Numero o codigo del pedido relacionado con
  -- la entrega.
  --
  -- ----------------------------------------------------------

  pedido TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- FECHA PREVISTA
  -- ----------------------------------------------------------
  --
  -- Fecha en la que estaba previsto realizar
  -- la entrega al cliente.
  --
  -- Esta fecha puede utilizarse para determinar
  -- si la entrega se ha realizado a tiempo.
  --
  -- ----------------------------------------------------------

  fecha_prevista DATE,


  -- ----------------------------------------------------------
  -- FECHA REAL DE ENTREGA
  -- ----------------------------------------------------------
  --
  -- Fecha en la que realmente se realizo
  -- la entrega al cliente.
  --
  -- ----------------------------------------------------------

  fecha_entrega DATE,


  -- ----------------------------------------------------------
  -- CANTIDAD PEDIDA
  -- ----------------------------------------------------------
  --
  -- Cantidad total solicitada por el cliente
  -- en el pedido.
  --
  -- ----------------------------------------------------------

  cantidad_pedida NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- CANTIDAD ENTREGADA
  -- ----------------------------------------------------------
  --
  -- Cantidad realmente entregada al cliente.
  --
  -- ----------------------------------------------------------

  cantidad_entregada NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- MOTIVO
  -- ----------------------------------------------------------
  --
  -- Permite registrar el motivo asociado al incumplimiento
  -- de la entrega.
  --
  -- Puede utilizarse cuando:
  --
  --   - La entrega llega tarde
  --   - La cantidad es incompleta
  --   - Existe una incidencia de transporte
  --   - Existe falta de stock
  --   - Existe un problema de produccion
  --   - Existe cualquier otra desviacion
  --
  -- ----------------------------------------------------------

  motivo TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- TRANSPORTISTA
  -- ----------------------------------------------------------
  --
  -- Nombre de la empresa o transportista responsable
  -- de realizar la entrega.
  --
  -- ----------------------------------------------------------

  transportista TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ON TIME
  -- ----------------------------------------------------------
  --
  -- Indica si el pedido se entrego dentro del plazo previsto.
  --
  -- FALSE = Entrega fuera de plazo
  -- TRUE  = Entrega dentro del plazo
  --
  -- Conceptualmente:
  --
  -- fecha_entrega <= fecha_prevista
  --
  -- ----------------------------------------------------------

  on_time BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- IN FULL
  -- ----------------------------------------------------------
  --
  -- Indica si se entrego completamente la cantidad
  -- solicitada por el cliente.
  --
  -- FALSE = Entrega incompleta
  -- TRUE  = Entrega completa
  --
  -- Conceptualmente:
  --
  -- cantidad_entregada >= cantidad_pedida
  --
  -- ----------------------------------------------------------

  in_full BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- OTIF
  -- ----------------------------------------------------------
  --
  -- Resultado final del indicador OTIF.
  --
  -- Para que una entrega sea OTIF deben cumplirse
  -- simultaneamente:
  --
  --   on_time = TRUE
  --   in_full = TRUE
  --
  -- Conceptualmente:
  --
  -- OTIF = ON TIME + IN FULL
  --
  -- FALSE = No cumple OTIF
  -- TRUE  = Cumple OTIF
  --
  -- ----------------------------------------------------------

  otif BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- FECHA DE REGISTRO
  -- ----------------------------------------------------------
  --
  -- Fecha en la que la entrega se registra dentro
  -- de NAGRUP Quality.
  --
  -- ----------------------------------------------------------

  fecha_registro DATE,


  -- ----------------------------------------------------------
  -- FECHA TECNICA DE CREACION
  -- ----------------------------------------------------------
  --
  -- PostgreSQL asigna automaticamente la fecha y hora
  -- exactas en las que se crea el registro.
  --
  -- Incluye informacion de zona horaria.
  --
  -- ----------------------------------------------------------

  created_at TIMESTAMPTZ DEFAULT now()

);