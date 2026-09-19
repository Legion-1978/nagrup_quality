export const crearModeloFormacion = () => ({
  id: "",

  /* EMPLEADO */

  empleado: "",
  codigoEmpleado: "",
  dni: "",

  puesto: "",
  departamento: "",
  centroTrabajo: "",

  /* FORMACIÓN */

  curso: "",
  codigoCurso: "",

  categoria: "",
  tipo: "",

  modalidad: "Presencial",

  proveedor: "",
  formador: "",

  responsable: "",

  horas: "",
  coste: "",

  /* FECHAS */

  fechaSolicitud: "",
  fechaPlanificada: "",

  fechaInicio: "",
  fechaFin: "",

  fechaRenovacion: "",
  fechaCaducidad: "",

  /* ESTADO */

  estadoFormacion: "Planificada",

  /* EVALUACIÓN */

  metodoEvaluacion: "",

  evaluacion: "",

  resultadoEvaluacion: "",

  resultado: "",

  nota: "",

  /* COMPETENCIAS */

  competencia: "",
  competenciaRequerida: "",
  competenciaAdquirida: "",

  nivelCompetencia: "",

  /* CERTIFICACIÓN */

  certificado: false,

  numeroCertificado: "",

  organismoEmisor: "",

  fechaCertificacion: "",

  /* ISO */

  requisitoLegal: "",

  obligatoria: false,

  evidenciaDisponible: false,

  eficaz: false,

  validada: false,

  /* LOGÍSTICA */

  adr: "",

  carretillas: "",

  manipulacionCargas: "",

  seguridadVial: "",

  puenteGrua: "",

  maquinaria: "",

  mercancíasPeligrosas: "",

  /* RENOVACIONES */

  requiereRenovacion: false,

  vigenciaMeses: "",

  vencimiento: "",

  /* RIESGO */

  criticidad: "Media",

  riesgoPorNoFormacion: "Bajo",

  /* AUDITORÍA */

  auditor: "",

  fechaRevision: "",

  fechaRegistro: "",

  fechaUltimaRevision: "",

  revisadoPor: "",

  /* OBSERVACIONES */

  observaciones: "",

  /* EVIDENCIAS */

  evidencias: [],

  /* COMENTARIOS */

  comentarios: [],

  /* TRAZABILIDAD */

  historial: [],
});