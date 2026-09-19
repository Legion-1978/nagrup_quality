export const crearModeloIncidencia = () => ({
  // IDENTIFICACIÓN

  id: "",

  fecha: "",
  fechaCreacion: "",

  // CLASIFICACIÓN

  area: "",
  proceso: "",
  turno: "",
  ubicacion: "",

  categoria: "",
  subcategoria: "",

  origen: "Interna",

  // PRODUCTO AFECTADO

  sku: "",

  cantidadAfectada: 0,

  // INCIDENCIA

  problema: "",

  gravedad: "Media",

  estado: "Registrada",

  responsable: "",

  // IMPACTO

  impactoEconomico: 0,

  // ANÁLISIS

  causaRaiz: "",

  recurrencia: false,

  // ACCIONES CAPA

  accionInmediata: "",

  accionCorrectiva: "",

  accionPreventiva: "",

  accionesAbiertas: 0,

  // SEGUIMIENTO

  fechaCompromiso: "",

  fechaCierre: "",

  diasResolucion: 0,

  descripcionCierre: "",

  revisada: false,

  validada: false,

  // EVIDENCIAS

  comentarios: [],

  evidencias: [],

  historial: [],
});