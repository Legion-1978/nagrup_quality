export const crearModeloNC = () => ({

  /* ===================================================== */
  /* IDENTIFICACIÓN */
  /* ===================================================== */

  uuid: "",
  id: "",

  /* ===================================================== */
  /* FECHAS */
  /* ===================================================== */

  fecha: "",
  fechaCreacion: "",
  fechaCierre: "",

  fechaVerificacion: "",

  /* ===================================================== */
  /* DATOS GENERALES */
  /* ===================================================== */

  proveedor: "",
  responsable: "",
  evaluador: "",

  codigoProducto: "",

  lote: "",
  pedidoCompra: "",

  /* ===================================================== */
  /* CLASIFICACIÓN DE LA NC */
  /* ===================================================== */

  tipoNC: "",

  /*
    Materia Prima
    Envase
    Etiquetado
    Documentación
    Transporte
    Cantidad
    Calidad
    Otro
  */

  gravedad: "Media",

  /*
    Baja
    Media
    Alta
  */

  impacto: "Medio",

  /*
    Bajo
    Medio
    Alto
    Crítico
  */

  /* ===================================================== */
  /* DESCRIPCIÓN NC */
  /* ===================================================== */

  problema: "",

  causaRaiz: "",

  /* ===================================================== */
  /* GESTIÓN Y SEGUIMIENTO */
  /* ===================================================== */

  accionInmediata: "",

  accionCorrectiva: "",

  respuestaProveedor: "",

  conclusion: "",

  verificacionEficacia: "",

  estado: "Abierta",

  /*
    Abierta
    En Investigación
    Acción Correctiva
    Pendiente Proveedor
    Cerrada
  */

  diasResolucion: 0,

  /* ===================================================== */
  /* IMPACTO ECONÓMICO */
  /* ===================================================== */

  costeNagrup: 0,

  importeAbonado: 0,

  /* ===================================================== */
  /* AUDITORÍA */
  /* ===================================================== */

  comentarios: [],

  historial: [],

  /* ===================================================== */
  /* EVIDENCIAS */
  /* ===================================================== */

  evidencias: [],

});