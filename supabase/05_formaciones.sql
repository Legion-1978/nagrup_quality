-- ============================================================
-- NAGRUP QUALITY
-- ARCHIVO: 05_formaciones.sql
-- MODULO: FORMACIONES
-- ============================================================
--
-- DESCRIPCION:
-- Crea la tabla principal utilizada para gestionar la
-- formacion de los empleados.
--
-- Permite almacenar:
--
--   - Datos del empleado
--   - Datos del curso
--   - Proveedor y formador
--   - Horas y costes
--   - Planificacion
--   - Evaluacion
--   - Competencias
--   - Certificaciones
--   - Requisitos obligatorios
--   - Formaciones especificas
--   - Renovaciones y caducidades
--   - Riesgos
--   - Revision y auditoria
--   - Evidencias
--   - Comentarios
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
-- TABLA: formaciones
-- ============================================================

CREATE TABLE IF NOT EXISTS public.formaciones (

  -- ----------------------------------------------------------
  -- IDENTIFICACION DEL REGISTRO
  -- ----------------------------------------------------------
  --
  -- Codigo unico de la formacion.
  --
  -- Ejemplo:
  --
  -- FOR26001
  -- FOR26002
  --
  -- ----------------------------------------------------------

  id TEXT PRIMARY KEY,


  -- ----------------------------------------------------------
  -- DATOS DEL EMPLEADO
  -- ----------------------------------------------------------

  -- Nombre del empleado que realiza la formacion.

  empleado TEXT DEFAULT '',


  -- Codigo interno del empleado.

  codigo_empleado TEXT DEFAULT '',


  -- DNI o documento identificativo del empleado.

  dni TEXT DEFAULT '',


  -- Puesto de trabajo del empleado.

  puesto TEXT DEFAULT '',


  -- Departamento al que pertenece.

  departamento TEXT DEFAULT '',


  -- Centro de trabajo del empleado.

  centro_trabajo TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- INFORMACION DEL CURSO
  -- ----------------------------------------------------------

  -- Nombre del curso o formacion.

  curso TEXT DEFAULT '',


  -- Codigo interno asignado al curso.

  codigo_curso TEXT DEFAULT '',


  -- Categoria de la formacion.

  categoria TEXT DEFAULT '',


  -- Tipo de formacion.

  tipo TEXT DEFAULT '',


  -- Modalidad.
  --
  -- Ejemplos:
  -- Presencial
  -- Online
  -- Mixta

  modalidad TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- PROVEEDOR Y RESPONSABLES
  -- ----------------------------------------------------------

  -- Empresa o entidad que imparte la formacion.

  proveedor TEXT DEFAULT '',


  -- Persona que imparte la formacion.

  formador TEXT DEFAULT '',


  -- Responsable interno de la formacion.

  responsable TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- DURACION Y COSTE
  -- ----------------------------------------------------------

  -- Numero de horas de formacion.

  horas NUMERIC DEFAULT 0,


  -- Coste economico de la formacion.

  coste NUMERIC DEFAULT 0,


  -- ----------------------------------------------------------
  -- PLANIFICACION Y FECHAS
  -- ----------------------------------------------------------

  -- Fecha en la que se solicita la formacion.

  fecha_solicitud DATE,


  -- Fecha inicialmente planificada.

  fecha_planificada DATE,


  -- Fecha de inicio.

  fecha_inicio DATE,


  -- Fecha de finalizacion.

  fecha_fin DATE,


  -- Fecha prevista o realizada de renovacion.

  fecha_renovacion DATE,


  -- Fecha de caducidad de la formacion o certificacion.

  fecha_caducidad DATE,


  -- ----------------------------------------------------------
  -- ESTADO DE LA FORMACION
  -- ----------------------------------------------------------
  --
  -- Permite controlar en que situacion se encuentra.
  --
  -- Ejemplos:
  --
  -- Solicitada
  -- Planificada
  -- En curso
  -- Completada
  -- Cancelada
  -- Caducada
  --
  -- ----------------------------------------------------------

  estado_formacion TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- EVALUACION
  -- ----------------------------------------------------------

  -- Metodo utilizado para evaluar al empleado.

  metodo_evaluacion TEXT DEFAULT '',


  -- Informacion de la evaluacion realizada.

  evaluacion TEXT DEFAULT '',


  -- Resultado especifico de la evaluacion.

  resultado_evaluacion TEXT DEFAULT '',


  -- Resultado general de la formacion.

  resultado TEXT DEFAULT '',


  -- Nota obtenida.

  nota TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- COMPETENCIAS
  -- ----------------------------------------------------------

  -- Competencia relacionada con la formacion.

  competencia TEXT DEFAULT '',


  -- Competencia necesaria antes o como objetivo
  -- de la formacion.

  competencia_requerida TEXT DEFAULT '',


  -- Competencia finalmente adquirida.

  competencia_adquirida TEXT DEFAULT '',


  -- Nivel alcanzado.

  nivel_competencia TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- CERTIFICACION
  -- ----------------------------------------------------------

  -- Indica si existe certificado.

  certificado BOOLEAN DEFAULT FALSE,


  -- Numero o identificador del certificado.

  numero_certificado TEXT DEFAULT '',


  -- Organismo o entidad que emite el certificado.

  organismo_emisor TEXT DEFAULT '',


  -- Fecha oficial de certificacion.

  fecha_certificacion DATE,


  -- ----------------------------------------------------------
  -- REQUISITOS LEGALES Y OBLIGATORIEDAD
  -- ----------------------------------------------------------

  -- Requisito legal relacionado con la formacion.

  requisito_legal TEXT DEFAULT '',


  -- Indica si la formacion es obligatoria.

  obligatoria BOOLEAN DEFAULT FALSE,


  -- Indica si existe evidencia documental disponible.

  evidencia_disponible BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- EFICACIA Y VALIDACION
  -- ----------------------------------------------------------

  -- Indica si la formacion se considera eficaz.

  eficaz BOOLEAN DEFAULT FALSE,


  -- Indica si la formacion ha sido validada.

  validada BOOLEAN DEFAULT FALSE,


  -- ----------------------------------------------------------
  -- FORMACIONES / HABILITACIONES ESPECIFICAS
  -- ----------------------------------------------------------
  --
  -- Estos campos permiten registrar informacion relacionada
  -- con determinadas formaciones o habilitaciones.
  --
  -- Se mantienen como TEXT para conservar la estructura
  -- utilizada actualmente por la aplicacion.
  --
  -- ----------------------------------------------------------

  adr TEXT DEFAULT '',

  carretillas TEXT DEFAULT '',

  manipulacion_cargas TEXT DEFAULT '',

  seguridad_vial TEXT DEFAULT '',

  puente_grua TEXT DEFAULT '',

  maquinaria TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- RENOVACION Y VIGENCIA
  -- ----------------------------------------------------------

  -- Indica si la formacion debe renovarse.

  requiere_renovacion BOOLEAN DEFAULT FALSE,


  -- Numero de meses durante los que la formacion
  -- permanece vigente.

  vigencia_meses NUMERIC DEFAULT 0,


  -- Fecha de vencimiento calculada o registrada
  -- por la aplicacion.

  vencimiento DATE,


  -- ----------------------------------------------------------
  -- CRITICIDAD Y RIESGO
  -- ----------------------------------------------------------

  -- Nivel de criticidad de la formacion.

  criticidad TEXT DEFAULT '',


  -- Riesgo asociado a que el empleado no disponga
  -- de esta formacion.

  riesgo_por_no_formacion TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- AUDITORIA Y REVISION
  -- ----------------------------------------------------------

  -- Persona encargada de auditar o revisar.

  auditor TEXT DEFAULT '',


  -- Fecha de revision.

  fecha_revision DATE,


  -- Fecha en la que se registro la formacion.

  fecha_registro DATE,


  -- Fecha de la ultima revision realizada.

  fecha_ultima_revision DATE,


  -- Persona que realizo la ultima revision.

  revisado_por TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- OBSERVACIONES
  -- ----------------------------------------------------------

  -- Campo libre para informacion adicional.

  observaciones TEXT DEFAULT '',


  -- ----------------------------------------------------------
  -- EVIDENCIAS
  -- ----------------------------------------------------------
  --
  -- Permite almacenar una lista de evidencias relacionadas
  -- con la formacion.
  --
  -- Por ejemplo:
  --
  -- Certificados
  -- Diplomas
  -- Documentos
  -- Fotografias
  -- Justificantes
  -- Enlaces
  --
  -- ----------------------------------------------------------

  evidencias JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- COMENTARIOS
  -- ----------------------------------------------------------
  --
  -- Permite almacenar multiples comentarios relacionados
  -- con el registro.
  --
  -- ----------------------------------------------------------

  comentarios JSONB DEFAULT '[]'::jsonb,


  -- ----------------------------------------------------------
  -- HISTORIAL
  -- ----------------------------------------------------------
  --
  -- Permite conservar la trazabilidad de los cambios
  -- realizados sobre la formacion.
  --
  -- Por ejemplo:
  --
  -- Creacion
  -- Cambio de estado
  -- Renovacion
  -- Validacion
  -- Revision
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