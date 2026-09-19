export const crearModeloSatisfaccion =
  () => ({
    uuid: "",
    id: "",

    cliente: "",
    responsable: "",

    pedido: "",
    producto: "",

    fecha: "",
    fechaCreacion: "",

    canal: "Teléfono",

    // Net Promoter Score, 0-10
    nps: null,

    // Sub-notas por aspecto, 1-5
    notaCalidad: null,
    notaPlazo: null,
    notaComunicacion: null,
    notaPrecio: null,

    comentario: "",

    estado: "Pendiente",

    requiereSeguimiento: false,
    accionSeguimiento: "",

    reclamacionRelacionada: "",

    comentarios: [],
    historial: [],
  });
