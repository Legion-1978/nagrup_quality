const obtenerFechaActual = () => {

  const fecha = new Date();

  const dia = String(
    fecha.getDate()
  ).padStart(2, "0");

  const mes = String(
    fecha.getMonth() + 1
  ).padStart(2, "0");

  const anio =
    fecha.getFullYear();

  return `${dia}-${mes}-${anio}`;

};

// Clasifica una nota NPS (0-10) según la metodología estándar:
// 0-6 Detractor, 7-8 Pasivo, 9-10 Promotor.
export const clasificarNPS = nps => {

  if (nps === null || nps === undefined || nps === "") {
    return "Sin datos";
  }

  const valor = Number(nps);

  if (valor >= 9) return "Promotor";

  if (valor >= 7) return "Pasivo";

  return "Detractor";

};

export const crearNuevaSatisfaccion = ({
  id,
  cliente,
  responsable,
  pedido,
  producto,
  fecha,
  canal,
  nps,
  notaCalidad,
  notaPlazo,
  notaComunicacion,
  notaPrecio,
  comentario,
  reclamacionRelacionada,
  crearModeloSatisfaccion,
}) => {

  const nueva =
    crearModeloSatisfaccion();

  nueva.id = id;

  nueva.cliente =
    cliente.trim();

  nueva.responsable =
    responsable?.trim() || "";

  nueva.pedido =
    pedido?.trim() || "";

  nueva.producto =
    producto?.trim() || "";

  nueva.fecha = fecha;

  nueva.fechaCreacion =
    obtenerFechaActual();

  nueva.canal =
    canal?.trim() || "Teléfono";

  nueva.nps =
    nps === "" || nps === undefined
      ? null
      : Number(nps);

  nueva.notaCalidad =
    notaCalidad === "" || notaCalidad === undefined
      ? null
      : Number(notaCalidad);

  nueva.notaPlazo =
    notaPlazo === "" || notaPlazo === undefined
      ? null
      : Number(notaPlazo);

  nueva.notaComunicacion =
    notaComunicacion === "" || notaComunicacion === undefined
      ? null
      : Number(notaComunicacion);

  nueva.notaPrecio =
    notaPrecio === "" || notaPrecio === undefined
      ? null
      : Number(notaPrecio);

  nueva.comentario =
    comentario?.trim() || "";

  nueva.reclamacionRelacionada =
    reclamacionRelacionada?.trim() || "";

  nueva.estado = "Respondida";

  nueva.requiereSeguimiento =
    clasificarNPS(nueva.nps) === "Detractor";

  nueva.accionSeguimiento = "";

  nueva.comentarios = [];
  nueva.historial = [];

  return nueva;

};

export const actualizarSatisfaccion = (
  registros,
  id,
  datos
) => {

  return registros.map(
    item =>

      item.id === id
        ? {
            ...item,
            ...datos,

            requiereSeguimiento:
              "nps" in datos
                ? clasificarNPS(datos.nps) === "Detractor"
                : item.requiereSeguimiento,
          }
        : item

  );

};

export const borrarSatisfaccion = (
  registros,
  id
) => {

  return registros.filter(
    item => item.id !== id
  );

};

export const actualizarEstadoSatisfaccion = (
  registros,
  id
) => {

  const estados = [
    "Pendiente",
    "Enviada",
    "Respondida",
    "Cerrada",
  ];

  return registros.map(
    item => {

      if (item.id !== id) {
        return item;
      }

      const indice =
        estados.indexOf(
          item.estado
        );

      const siguiente =
        indice ===
        estados.length - 1
          ? 0
          : indice + 1;

      return {
        ...item,
        estado: estados[siguiente],
      };

    }
  );

};

export const marcarSeguimientoResuelto = (
  registros,
  id,
  accionSeguimiento
) => {

  return registros.map(
    item =>

      item.id === id
        ? {
            ...item,

            requiereSeguimiento: false,

            accionSeguimiento:
              accionSeguimiento?.trim() ||
              item.accionSeguimiento,

            estado: "Cerrada",
          }
        : item

  );

};

export const agregarComentarioSatisfaccion = (
  registros,
  id,
  comentario
) => {

  return registros.map(
    item =>

      item.id === id
        ? {
            ...item,

            comentarios: [
              ...(item.comentarios || []),
              comentario,
            ],

          }
        : item

  );

};
