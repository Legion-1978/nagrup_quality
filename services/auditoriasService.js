const obtenerFechaActual = () => {
  return new Date()
    .toISOString()
    .split("T")[0];
};

const obtenerFechaHoraActual = () => {

  return new Date().toLocaleString(
    "es-ES"
  );

};

export const crearNuevaAuditoria = ({
  id,
  tipo,
  norma,
  auditor,
  responsableAuditado,
  alcance,
  criterioAuditoria,
  fecha,
  resultado,
  conclusion,
  crearModeloAuditoria,
}) => {

  const nueva =
    crearModeloAuditoria();

  nueva.id = id;

  nueva.tipo =
    tipo?.trim() || "";

  nueva.norma =
    norma?.trim() || "";

  nueva.auditor =
    auditor?.trim() || "";

  nueva.responsableAuditado =
    responsableAuditado?.trim() || "";

  nueva.alcance =
    alcance?.trim() || "";

  nueva.criterioAuditoria =
    criterioAuditoria?.trim() || "";

  nueva.fecha = fecha;

  nueva.resultado =
    resultado?.trim() || "";

  nueva.conclusion =
    conclusion?.trim() || "";

  nueva.estado =
    "Planificada";

  nueva.hallazgos = [];

  nueva.noConformidades = [];

  nueva.acciones = [];

  nueva.accionesAbiertas = 0;

  nueva.ncAbiertas = 0;

  nueva.diasResolucion = 0;

  nueva.fechaCreacion =
    obtenerFechaActual();

  nueva.fechaCierre = null;

  nueva.comentarios = [];

  nueva.evidencias = [];

  nueva.historial = [
    {
      accion:
        "Auditoría creada",
      fecha:
        obtenerFechaHoraActual(),
    },
  ];

  return nueva;

};

export const borrarAuditoria = (
  auditorias,
  id
) => {

  return auditorias.filter(
    item => item.id !== id
  );

};

export const actualizarEstadoAuditoria = (
  auditorias,
  id
) => {

  const estados = [
    "Planificada",
    "En Ejecución",
    "Seguimiento",
    "Cerrada",
  ];

  return auditorias.map(
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

      const nuevoEstado =
        estados[siguiente];

      return {

        ...item,

        estado:
          nuevoEstado,

        fechaCierre:
          nuevoEstado ===
          "Cerrada"
            ? obtenerFechaActual()
            : "",

        historial: [
          ...(item.historial || []),

          {
            accion:
              `Estado cambiado a ${nuevoEstado}`,
            fecha:
              obtenerFechaHoraActual(),
          },
        ],

      };

    }
  );

};

export const actualizarAuditoria = (
  auditorias,
  id,
  datos
) => {

  return auditorias.map(
    item =>

      item.id === id
        ? {
            ...item,

            ...datos,

            historial: [
              ...(item.historial || []),

              {
                accion:
                  "Auditoría actualizada",
                fecha:
                  obtenerFechaHoraActual(),
              },
            ],

          }
        : item

  );

};

export const agregarComentarioAuditoria = (
  auditorias,
  id,
  comentario
) => {

  return auditorias.map(
    item =>

      item.id === id
        ? {

            ...item,

            comentarios: [
              ...(item.comentarios || []),
              comentario,
            ],

            historial: [
              ...(item.historial || []),

              {
                accion:
                  "Comentario añadido",
                fecha:
                  obtenerFechaHoraActual(),
              },
            ],

          }
        : item

  );

};

export const agregarEvidenciaAuditoria = (
  auditorias,
  id,
  evidencia
) => {

  return auditorias.map(
    item =>

      item.id === id
        ? {

            ...item,

            evidencias: [
              ...(item.evidencias || []),
              evidencia,
            ],

            historial: [
              ...(item.historial || []),

              {
                accion:
                  "Evidencia añadida",
                fecha:
                  obtenerFechaHoraActual(),
              },
            ],

          }
        : item

  );

};

export const agregarHallazgoAuditoria = (
  auditorias,
  id,
  hallazgo
) => {

  return auditorias.map(
    item =>

      item.id === id
        ? {

            ...item,

            hallazgos: [
              ...(item.hallazgos || []),
              hallazgo,
            ],

            historial: [
              ...(item.historial || []),

              {
                accion:
                  "Hallazgo añadido",
                fecha:
                  obtenerFechaHoraActual(),
              },
            ],

          }
        : item

  );

};

export const eliminarHallazgoAuditoria = (
  auditorias,
  id,
  hallazgoId
) => {

  return auditorias.map(
    item =>

      item.id === id
        ? {

            ...item,

            hallazgos:
              (item.hallazgos || []).filter(
                h => h.id !== hallazgoId
              ),

            historial: [
              ...(item.historial || []),

              {
                accion:
                  "Hallazgo eliminado",
                fecha:
                  obtenerFechaHoraActual(),
              },
            ],

          }
        : item

  );

};

export const agregarNoConformidadAuditoria = (
  auditorias,
  id,
  nc
) => {

  return auditorias.map(
    item =>

      item.id === id
        ? {

            ...item,

            noConformidades: [
              ...(item.noConformidades || []),
              nc,
            ],

            ncAbiertas:
              (item.ncAbiertas || 0) + 1,

            historial: [
              ...(item.historial || []),

              {
                accion:
                  "No conformidad registrada",
                fecha:
                  obtenerFechaHoraActual(),
              },
            ],

          }
        : item

  );

};

export const cambiarEstadoNoConformidadAuditoria = (
  auditorias,
  id,
  ncId
) => {

  return auditorias.map(
    item => {

      if (item.id !== id) {
        return item;
      }

      let delta = 0;

      const noConformidades = (
        item.noConformidades || []
      ).map(nc => {

        if (nc.id !== ncId) {
          return nc;
        }

        const cerrando =
          nc.estado !== "Cerrada";

        delta = cerrando ? -1 : 1;

        return {
          ...nc,
          estado: cerrando
            ? "Cerrada"
            : "Abierta",
          fechaCierre: cerrando
            ? obtenerFechaActual()
            : "",
        };

      });

      return {

        ...item,

        noConformidades,

        ncAbiertas: Math.max(
          0,
          (item.ncAbiertas || 0) + delta
        ),

        historial: [
          ...(item.historial || []),

          {
            accion:
              "Estado de no conformidad actualizado",
            fecha:
              obtenerFechaHoraActual(),
          },
        ],

      };

    }
  );

};

export const agregarAccionAuditoria = (
  auditorias,
  id,
  accion
) => {

  return auditorias.map(
    item =>

      item.id === id
        ? {

            ...item,

            acciones: [
              ...(item.acciones || []),
              accion,
            ],

            accionesAbiertas:
              (item.accionesAbiertas || 0) + 1,

            historial: [
              ...(item.historial || []),

              {
                accion:
                  "Acción de seguimiento creada",
                fecha:
                  obtenerFechaHoraActual(),
              },
            ],

          }
        : item

  );

};

export const cambiarEstadoAccionAuditoria = (
  auditorias,
  id,
  accionId
) => {

  return auditorias.map(
    item => {

      if (item.id !== id) {
        return item;
      }

      let delta = 0;

      const acciones = (
        item.acciones || []
      ).map(accion => {

        if (accion.id !== accionId) {
          return accion;
        }

        const completando =
          accion.estado !== "Completada";

        delta = completando ? -1 : 1;

        return {
          ...accion,
          estado: completando
            ? "Completada"
            : "Pendiente",
          fechaCompletada: completando
            ? obtenerFechaActual()
            : "",
        };

      });

      return {

        ...item,

        acciones,

        accionesAbiertas: Math.max(
          0,
          (item.accionesAbiertas || 0) + delta
        ),

        historial: [
          ...(item.historial || []),

          {
            accion:
              "Estado de acción actualizado",
            fecha:
              obtenerFechaHoraActual(),
          },
        ],

      };

    }
  );

};

export const eliminarEvidenciaAuditoria = (
  auditorias,
  id,
  evidenciaId
) => {

  return auditorias.map(
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

            historial: [
              ...(item.historial || []),

              {
                accion:
                  "Evidencia eliminada",
                fecha:
                  obtenerFechaHoraActual(),
              },
            ],

          }
        : item

  );

};