export const crearModeloProcedimiento = () => ({
  id: "",

  codigo: "",
  procedimiento: "",

  responsable: "",

  departamento: "Calidad",

  version: "",

  fecha: "",

  estado: "Vigente",

  criticidad: "Media",

  tipo: "",
  categoria: "",
  proceso: "",
  riesgo: "",

  frecuenciaRevision: "Anual",

  propietario: "",
  aprobador: "",

  observaciones: "",

  fechaRegistro: "",
  fechaUltimaRevision: "",
  fechaRevision: "",
  fechaProximaRevision: "",

  accionesPendientes: 0,

  validado: false,

  evidencias: [],
  comentarios: [],
  historial: [],
});