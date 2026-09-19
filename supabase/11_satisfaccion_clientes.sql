-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 11_satisfaccion_clientes.sql
-- MODULO: SATISFACCION DE CLIENTES
-- ============================================================
--
-- DESCRIPCION:
-- Crea la tabla utilizada para gestionar y analizar
-- la satisfaccion de los clientes.
--
-- Permite almacenar:
--
--   - Identificacion del registro
--   - Cliente
--   - Responsable
--   - Pedido
--   - Producto
--   - Fechas
--   - Canal
--   - NPS
--   - Valoracion de calidad
--   - Valoracion de plazo
--   - Valoracion de comunicacion
--   - Valoracion de precio
--   - Comentario del cliente
--   - Estado
--   - Necesidad de seguimiento
--   - Accion de seguimiento
--   - Reclamacion relacionada
--   - Comentarios internos
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
-- TABLA: satisfaccion_clientes
-- ============================================================

CREATE TABLE IF NOT EXISTS public.satisfaccion_clientes (


  -- ----------------------------------------------------------
  -- IDENTIFICACION
  -- ----------------------------------------------------------
  --
  -- Codigo unico del registro de satisfaccion.
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
  -- Nombre o identificacion del cliente evaluado.
  --
  -- ----------------------------------------------------------

  cliente TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- RESPONSABLE
  -- ----------------------------------------------------------
  --
  -- Persona interna responsable de gestionar o realizar
  -- el seguimiento de la evaluacion.
  --
  -- ----------------------------------------------------------

  responsable TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- PEDIDO
  -- ----------------------------------------------------------
  --
  -- Numero o codigo del pedido relacionado con
  -- la evaluacion del cliente.
  --
  -- ----------------------------------------------------------

  pedido TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- PRODUCTO
  -- ----------------------------------------------------------
  --
  -- Producto o referencia relacionada con
  -- la evaluacion.
  --
  -- ----------------------------------------------------------

  producto TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- FECHAS
  -- ----------------------------------------------------------

  -- Fecha de la encuesta, evaluacion o respuesta
  -- del cliente.

  fecha DATE,


  -- Fecha en la que se crea el registro dentro
  -- de NAGRUP Quality.

  fecha_creacion DATE,


  -- ----------------------------------------------------------
  -- CANAL
  -- ----------------------------------------------------------
  --
  -- Canal utilizado para obtener la valoracion
  -- del cliente.
  --
  -- Ejemplos:
  --
  -- Encuesta
  -- Email
  -- Telefono
  -- Formulario
  -- Reunión
  -- Web
  --
  -- ----------------------------------------------------------

  canal TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- NPS
  -- ----------------------------------------------------------
  --
  -- Valor relacionado con el Net Promoter Score (NPS)
  -- registrado para el cliente.
  --
  -- ----------------------------------------------------------

  nps NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- VALORACION DE CALIDAD
  -- ----------------------------------------------------------
  --
  -- Puntuacion otorgada por el cliente a la calidad
  -- del producto o servicio.
  --
  -- ----------------------------------------------------------

  nota_calidad NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- VALORACION DEL PLAZO
  -- ----------------------------------------------------------
  --
  -- Puntuacion otorgada por el cliente al cumplimiento
  -- de los plazos de entrega.
  --
  -- ----------------------------------------------------------

  nota_plazo NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- VALORACION DE LA COMUNICACION
  -- ----------------------------------------------------------
  --
  -- Puntuacion otorgada a la comunicacion y atencion
  -- recibida por el cliente.
  --
  -- ----------------------------------------------------------

  nota_comunicacion NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- VALORACION DEL PRECIO
  -- ----------------------------------------------------------
  --
  -- Puntuacion otorgada por el cliente al precio
  -- o relacion calidad-precio.
  --
  -- ----------------------------------------------------------

  nota_precio NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- COMENTARIO DEL CLIENTE
  -- ----------------------------------------------------------
  --
  -- Comentario, observacion o respuesta proporcionada
  -- directamente por el cliente.
  --
  -- ----------------------------------------------------------

  comentario TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ESTADO
  -- ----------------------------------------------------------
  --
  -- Estado actual del registro de satisfaccion.
  --
  -- Ejemplos conceptuales:
  --
  -- Registrada
  -- En revision
  -- Pendiente de seguimiento
  -- Gestionada
  -- Cerrada
  --
  -- ----------------------------------------------------------

  estado TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- REQUIERE SEGUIMIENTO
  -- ----------------------------------------------------------
  --
  -- Indica si la valoracion del cliente requiere alguna
  -- actuacion o seguimiento posterior.
  --
  -- FALSE = No requiere seguimiento
  -- TRUE  = Requiere seguimiento
  --
  -- ----------------------------------------------------------

  requiere_seguimiento BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- ACCION DE SEGUIMIENTO
  -- ----------------------------------------------------------
  --
  -- Accion que debe realizarse como consecuencia
  -- de la valoracion recibida.
  --
  -- Por ejemplo:
  --
  -- Contactar con el cliente
  -- Revisar incidencia
  -- Analizar producto
  -- Programar reunion
  -- Abrir reclamacion
  --
  -- ----------------------------------------------------------

  accion_seguimiento TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- RECLAMACION RELACIONADA
  -- ----------------------------------------------------------
  --
  -- Permite guardar el identificador de una reclamacion
  -- relacionada con esta valoracion.
  --
  -- Por ejemplo:
  --
  -- REC26001
  --
  -- IMPORTANTE:
  -- Actualmente se mantiene como TEXT porque asi aparece
  -- definido en el esquema original.
  --
  -- ----------------------------------------------------------

  reclamacion_relacionada TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- COMENTARIOS INTERNOS
  -- ----------------------------------------------------------
  --
  -- Permite almacenar multiples comentarios internos
  -- relacionados con el registro.
  --
  -- Se utiliza JSONB para poder almacenar una lista
  -- de comentarios.
  --
  -- Ejemplo conceptual:
  --
  -- [
  --   {
  --     "autor": "Usuario",
  --     "fecha": "2026-09-18",
  --     "comentario": "Contactar con el cliente"
  --   }
  -- ]
  --
  -- ----------------------------------------------------------

  comentarios JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- HISTORIAL
  -- ----------------------------------------------------------
  --
  -- Guarda la trazabilidad de los cambios realizados
  -- sobre el registro.
  --
  -- Puede utilizarse para registrar:
  --
  --   Creacion
  --   Cambio de estado
  --   Cambio de responsable
  --   Inicio de seguimiento
  --   Creacion de reclamacion
  --   Finalizacion del seguimiento
  --   Cierre
  --
  -- ----------------------------------------------------------

  historial JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- FECHA TECNICA DE CREACION
  -- ----------------------------------------------------------
  --
  -- PostgreSQL asigna automaticamente la fecha y hora
  -- exactas cuando se crea el registro.
  --
  -- ----------------------------------------------------------

  created_at TIMESTAMPTZ DEFAULT now()

);