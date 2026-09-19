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

const calcularDiasResolucion = fechaInicio => {

  if (!fechaInicio) {
    return 0;
  }

  const separador = fechaInicio.includes("/")
    ? "/"
    : "-";

  const [
    dia,
    mes,
    anio,
  ] = fechaInicio.split(
    separador
  );

  const inicio = new Date(
    Number(anio),
    Number(mes) - 1,
    Number(dia)
  );

  const hoy = new Date();

  return Math.max(
    0,
    Math.round(
      (hoy - inicio) /
        (1000 * 60 * 60 * 24)
    )
  );

};

export const crearNuevaReclamacion = ({
  id,
  cliente,
  descripcion,
  responsable,
  coste,
  fecha,
  gravedad,
  producto,
  pedido,
  lote,
  causaRaiz,
  accionCorrectiva,
  compensacion,
  crearModeloReclamacion,
}) => {

  const nueva =
    crearModeloReclamacion();

  nueva.id = id;

  nueva.cliente =
    cliente.trim();

  nueva.descripcion =
    descripcion.trim();

  nueva.responsable =
    responsable.trim();

  nueva.fecha = fecha;

  nueva.fechaCreacion =
    obtenerFechaActual();

  nueva.coste =
    Number(coste || 0);

  nueva.estado =
    "Abierta";

  nueva.gravedad =
    gravedad?.trim() || "Media";

  nueva.producto = producto?.trim() || "";
  nueva.pedido = pedido?.trim() || "";
  nueva.lote = lote?.trim() || "";

  nueva.causaRaiz = causaRaiz?.trim() || "";
  nueva.accionCorrectiva = accionCorrectiva?.trim() || "";

  nueva.compensacion = Number(compensacion || 0);

  nueva.validada = false;

  nueva.comentarios = [];
  nueva.evidencias = [];
  nueva.historial = [];

  return nueva;

};

export const borrarReclamacion = (
  reclamaciones,
  id
) => {

  return reclamaciones.filter(
    item => item.id !== id
  );

};

export const actualizarEstadoReclamacion = (
  reclamaciones,
  id
) => {

  const estados = [
    "Abierta",
    "En Investigación",
    "Acción Correctiva",
    "Pendiente Cliente",
    "Cerrada",
  ];

  return reclamaciones.map(
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

      const estaCerrada =
        estados[siguiente] ===
        "Cerrada";

      return {
        ...item,

        estado:
          estados[siguiente],

        fechaCierre:
          estaCerrada
            ? obtenerFechaActual()
            : "",

        diasResolucion:
          estaCerrada
            ? calcularDiasResolucion(
                item.fecha
              )
            : 0,
      };

    }
  );

};

export const actualizarReclamacion = (
  reclamaciones,
  id,
  datos
) => {

  return reclamaciones.map(
    item =>

      item.id === id
        ? {
            ...item,
            ...datos,
          }
        : item

  );

};

export const agregarComentarioReclamacion = (
  reclamaciones,
  id,
  comentario
) => {

  return reclamaciones.map(
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

export const agregarEvidenciaReclamacion = (
  reclamaciones,
  id,
  evidencia
) => {

  return reclamaciones.map(
    item =>

      item.id === id
        ? {
            ...item,

            evidencias: [
              ...(item.evidencias || []),
              evidencia,
            ],

          }
        : item

  );

};

export const eliminarEvidenciaReclamacion = (
  reclamaciones,
  id,
  evidenciaId
) => {

  return reclamaciones.map(
    item =>

      item.id === id
        ? {
            ...item,

            evidencias:
              item.evidencias?.filter(
                evidencia =>
                  evidencia.id !==
                  evidenciaId
              ) || [],

          }
        : item

  );

};


export const actualizarGravedadReclamacion = (
  reclamaciones,
  id
) => {

  const gravedadOrden = [
    "Baja",
    "Media",
    "Alta",
  ];

  return reclamaciones.map(
    item => {

      if (item.id !== id) {
        return item;
      }

      const indice =
        gravedadOrden.indexOf(
          item.gravedad
        );

      const siguiente =
        indice ===
        gravedadOrden.length - 1
          ? 0
          : indice + 1;

      return {
        ...item,
        gravedad:
          gravedadOrden[siguiente],
      };

    }
  );

};