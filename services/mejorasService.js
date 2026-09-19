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

const calcularDiasResolucion = (
  fechaInicio
) => {

  if (!fechaInicio) {
    return 0;
  }

  const hoy = new Date();

  const inicio =
    new Date(fechaInicio);

  return Math.max(
    0,
    Math.round(
      (hoy - inicio) /
        (1000 * 60 * 60 * 24)
    )
  );

};

export const crearNuevaMejora = ({
  id,
  titulo,
  categoria,
  responsable,
  descripcion,
  crearModeloMejora,
}) => {

  const nueva =
    crearModeloMejora();

  nueva.id = id;

  nueva.fecha =
    new Date().toLocaleDateString(
      "es-ES"
    );

  nueva.fechaCreacion =
    obtenerFechaActual();

  nueva.titulo =
    titulo.trim();

  nueva.categoria =
    categoria.trim();

  nueva.responsable =
    responsable.trim();

  nueva.descripcion =
    descripcion.trim();

  nueva.estado =
    "Propuesta";

  return nueva;

};

export const borrarMejora = (
  mejoras,
  id
) => {

  return mejoras.filter(
    item => item.id !== id
  );

};

export const actualizarMejora = (
  mejoras,
  id,
  datos
) => {

  return mejoras.map(
    item =>

      item.id === id
        ? {
            ...item,
            ...datos,
          }
        : item

  );

};

export const actualizarEstadoMejora = (
  mejoras,
  id
) => {

  const estados = [
    "Propuesta",
    "Aprobada",
    "En Curso",
    "Implantada",
    "Cerrada",
  ];

  return mejoras.map(
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

      const cerrada =
        estados[siguiente] ===
        "Cerrada";

      return {
        ...item,

        estado:
          estados[siguiente],

        fechaCierre:
          cerrada
            ? obtenerFechaActual()
            : "",

        diasResolucion:
          cerrada
            ? calcularDiasResolucion(
                item.fechaCreacion
              )
            : item.diasResolucion,
      };

    }
  );

};

export const agregarComentarioMejora = (
  mejoras,
  id,
  comentario
) => {

  return mejoras.map(
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

export const agregarEvidenciaMejora = (
  mejoras,
  id,
  evidencia
) => {

  return mejoras.map(
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

export const eliminarEvidenciaMejora = (
  mejoras,
  id,
  evidenciaId
) => {

  return mejoras.map(
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

export const actualizarImpactoMejora = (
  mejoras,
  id
) => {

  const niveles = [
    "Bajo",
    "Medio",
    "Alto",
  ];

  return mejoras.map(
    item => {

      if (item.id !== id) {
        return item;
      }

      const indice =
        niveles.indexOf(
          item.impacto
        );

      const siguiente =
        indice ===
        niveles.length - 1
          ? 0
          : indice + 1;

      return {
        ...item,

        impacto:
          niveles[siguiente],
      };

    }
  );

};

export const actualizarPrioridadMejora = (
  mejoras,
  id
) => {

  const niveles = [
    "Baja",
    "Media",
    "Alta",
  ];

  return mejoras.map(
    item => {

      if (item.id !== id) {
        return item;
      }

      const indice =
        niveles.indexOf(
          item.prioridad
        );

      const siguiente =
        indice ===
        niveles.length - 1
          ? 0
          : indice + 1;

      return {
        ...item,

        prioridad:
          niveles[siguiente],
      };

    }
  );

};