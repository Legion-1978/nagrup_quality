-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 09_proveedores_nc.sql
-- MODULO: NO CONFORMIDADES DE PROVEEDORES
-- ============================================================
--
-- DESCRIPCION:
-- Crea la tabla utilizada para gestionar las no conformidades
-- relacionadas con proveedores.
--
-- Permite almacenar:
--
--   - Identificacion de la no conformidad
--   - Fechas
--   - Proveedor
--   - Responsable interno
--   - Evaluador
--   - Producto afectado
--   - Lote
--   - Pedido de compra
--   - Tipo de no conformidad
--   - Gravedad e impacto
--   - Descripcion del problema
--   - Analisis de causa raiz
--   - Accion inmediata
--   - Accion correctiva
--   - Respuesta del proveedor
--   - Conclusion
--   - Verificacion de eficacia
--   - Estado
--   - Tiempo de resolucion
--   - Costes
--   - Comentarios
--   - Historial
--   - Evidencias
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
-- TABLA: proveedores_nc
-- ============================================================

CREATE TABLE IF NOT EXISTS public.proveedores_nc (

  -- ----------------------------------------------------------
  -- IDENTIFICACION
  -- ----------------------------------------------------------
  --
  -- Codigo unico de la no conformidad del proveedor.
  --
  -- Ejemplos:
  --
  -- PRV26001
  -- PRV26002
  --
  -- El codigo puede generarse mediante el sistema de
  -- correlativos configurado en:
  --
  --   03_contadores.sql
  --
  -- ----------------------------------------------------------

  id TEXT PRIMARY KEY,


  -- ----------------------------------------------------------
  -- FECHAS
  -- ----------------------------------------------------------

  -- Fecha en la que se detecta o produce la no conformidad.

  fecha DATE,


  -- Fecha en la que se crea el registro en la aplicacion.

  fecha_creacion DATE,


  -- Fecha en la que se cierra oficialmente la
  -- no conformidad.

  fecha_cierre DATE,


  -- Fecha en la que se verifica la eficacia de las
  -- acciones implantadas.

  fecha_verificacion DATE,


  -- ----------------------------------------------------------
  -- PROVEEDOR Y RESPONSABLES
  -- ----------------------------------------------------------

  -- Nombre del proveedor relacionado con la
  -- no conformidad.

  proveedor TEXT DEFAULT '',


  -- Responsable interno encargado de gestionar
  -- la no conformidad.

  responsable TEXT DEFAULT '',


  -- Persona encargada de evaluar o verificar
  -- la no conformidad.

  evaluador TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- PRODUCTO
  -- ----------------------------------------------------------

  -- Codigo o referencia del producto afectado.

  codigo_producto TEXT DEFAULT '',


  -- Numero o codigo del lote afectado.

  lote TEXT DEFAULT '',


  -- Pedido de compra relacionado con la
  -- no conformidad.

  pedido_compra TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- CLASIFICACION
  -- ----------------------------------------------------------

  -- Tipo de no conformidad.
  --
  -- Se mantiene el nombre original utilizado por
  -- la aplicacion:
  --
  -- tipo_n_c
  --
  -- ----------------------------------------------------------

  tipo_n_c TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- GRAVEDAD
  -- ----------------------------------------------------------
  --
  -- Nivel de gravedad de la no conformidad.
  --
  -- Ejemplos conceptuales:
  --
  -- Baja
  -- Media
  -- Alta
  -- Critica
  --
  -- ----------------------------------------------------------

  gravedad TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- IMPACTO
  -- ----------------------------------------------------------
  --
  -- Describe el impacto provocado por la no conformidad.
  --
  -- Puede representar impacto sobre:
  --
  --   Calidad
  --   Produccion
  --   Cliente
  --   Seguridad
  --   Coste
  --   Plazo
  --
  -- ----------------------------------------------------------

  impacto TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- DESCRIPCION DEL PROBLEMA
  -- ----------------------------------------------------------

  -- Descripcion detallada de la no conformidad detectada.

  problema TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ANALISIS DE CAUSA RAIZ
  -- ----------------------------------------------------------
  --
  -- Resultado del analisis realizado para determinar
  -- por que se produjo la no conformidad.
  --
  -- ----------------------------------------------------------

  causa_raiz TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ACCION INMEDIATA
  -- ----------------------------------------------------------
  --
  -- Accion realizada inmediatamente tras detectar
  -- la no conformidad.
  --
  -- Habitualmente se utiliza para contener el problema
  -- mientras se investiga la causa raiz.
  --
  -- ----------------------------------------------------------

  accion_inmediata TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ACCION CORRECTIVA
  -- ----------------------------------------------------------
  --
  -- Accion adoptada para eliminar la causa del problema
  -- y evitar que vuelva a producirse.
  --
  -- ----------------------------------------------------------

  accion_correctiva TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- RESPUESTA DEL PROVEEDOR
  -- ----------------------------------------------------------
  --
  -- Respuesta, explicacion o plan de accion enviado
  -- por el proveedor.
  --
  -- ----------------------------------------------------------

  respuesta_proveedor TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- CONCLUSION
  -- ----------------------------------------------------------
  --
  -- Conclusion final de la gestion de la
  -- no conformidad.
  --
  -- ----------------------------------------------------------

  conclusion TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- VERIFICACION DE EFICACIA
  -- ----------------------------------------------------------
  --
  -- Resultado de la comprobacion realizada posteriormente
  -- para verificar que las acciones adoptadas han sido
  -- eficaces.
  --
  -- ----------------------------------------------------------

  verificacion_eficacia TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- ESTADO
  -- ----------------------------------------------------------
  --
  -- Estado actual de la no conformidad.
  --
  -- Ejemplos conceptuales:
  --
  -- Abierta
  -- En investigacion
  -- Esperando proveedor
  -- Accion en curso
  -- Pendiente de verificacion
  -- Cerrada
  --
  -- ----------------------------------------------------------

  estado TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- TIEMPO DE RESOLUCION
  -- ----------------------------------------------------------
  --
  -- Numero de dias utilizados para resolver la
  -- no conformidad.
  --
  -- ----------------------------------------------------------

  dias_resolucion NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- COSTE PARA NAGRUP
  -- ----------------------------------------------------------
  --
  -- Coste economico soportado por NAGRUP como consecuencia
  -- de la no conformidad del proveedor.
  --
  -- ----------------------------------------------------------

  coste_nagrup NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- IMPORTE ABONADO
  -- ----------------------------------------------------------
  --
  -- Importe abonado, compensado o recuperado relacionado
  -- con la no conformidad.
  --
  -- ----------------------------------------------------------

  importe_abonado NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- COMENTARIOS
  -- ----------------------------------------------------------
  --
  -- Permite almacenar multiples comentarios asociados
  -- a la no conformidad.
  --
  -- Ejemplo conceptual:
  --
  -- [
  --   {
  --     "autor": "Usuario",
  --     "fecha": "2026-09-18",
  --     "comentario": "Pendiente de respuesta del proveedor"
  --   }
  -- ]
  --
  -- ----------------------------------------------------------

  comentarios JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- HISTORIAL
  -- ----------------------------------------------------------
  --
  -- Permite conservar la trazabilidad de los cambios
  -- realizados sobre la no conformidad.
  --
  -- Puede utilizarse para registrar:
  --
  --   Creacion
  --   Cambio de estado
  --   Cambio de responsable
  --   Respuesta del proveedor
  --   Acciones implantadas
  --   Verificacion
  --   Cierre
  --   Reapertura
  --
  -- ----------------------------------------------------------

  historial JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- EVIDENCIAS
  -- ----------------------------------------------------------
  --
  -- Permite asociar diferentes evidencias relacionadas
  -- con la no conformidad.
  --
  -- Por ejemplo:
  --
  --   Fotografias
  --   Informes
  --   PDFs
  --   Certificados
  --   Documentos del proveedor
  --   Correos
  --   Archivos
  --   Enlaces
  --
  -- ----------------------------------------------------------

  evidencias JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- FECHA TECNICA DE CREACION
  -- ----------------------------------------------------------
  --
  -- Fecha y hora reales en las que PostgreSQL crea
  -- el registro.
  --
  -- Se genera automaticamente.
  --
  -- ----------------------------------------------------------

  created_at TIMESTAMPTZ DEFAULT now()

);