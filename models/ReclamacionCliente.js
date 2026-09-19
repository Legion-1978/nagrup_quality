export const crearModeloReclamacion =
  () => ({
    uuid: "",
    id: "",

    cliente: "",
    responsable: "",

    descripcion: "",

    fecha: "",
    fechaCreacion: "",
    fechaCierre: "",

    estado: "Abierta",
    gravedad: "Media",

    coste: 0,
    compensacion: 0,

    diasResolucion: 0,

    producto: "",
    pedido: "",
    lote: "",

    causaRaiz: "",
    accionCorrectiva: "",

    validada: false,

    comentarios: [],
    evidencias: [],
    historial: [],
  });