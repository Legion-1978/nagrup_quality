export const crearModeloAuditoria = () => ({
  id: "",

  tipo: "",

  norma: "",

  auditor: "",

  responsableAuditado: "",

  alcance: "",

  criterioAuditoria: "",

  fecha: "",

  fechaCreacion: "",

  fechaCierre: "",

  estado: "Planificada",

  resultado: "",

  conclusion: "",

  hallazgos: [],

  noConformidades: [],

  acciones: [],

  accionesAbiertas: 0,

  ncAbiertas: 0,

  diasResolucion: 0,

  comentarios: [],

  evidencias: [],

  historial: [],
});