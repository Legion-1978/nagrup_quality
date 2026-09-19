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

export const crearNuevaFormacion = ({
  titulo,
  descripcion,
  tipo,
  categoria,
  proveedor,
  formador,
  responsable,
  departamento,
  puesto,
  modalidad,
  ubicacion,
  fechaInicio,
  fechaFin,
  fechaRenovacion,
  duracionHoras,
  participantes,
  coste,
  resultadoEvaluacion,
  eficaciaFormacion,
  validadoPor,
  observaciones,
  crearModeloFormacion,
}) => {
  const nueva =
    crearModeloFormacion();

  nueva.id =
    "FOR-" + Date.now();

  nueva.titulo =
    titulo?.trim() || "";

  nueva.descripcion =
    descripcion?.trim() || "";

  nueva.tipo =
    tipo?.trim() || "";

  nueva.categoria =
    categoria?.trim() || "";

  nueva.proveedor =
    proveedor?.trim() || "";

  nueva.formador =
    formador?.trim() || "";

  nueva.responsable =
    responsable?.trim() || "";

  nueva.departamento =
    departamento?.trim() || "";

  nueva.puesto =
    puesto?.trim() || "";

  nueva.modalidad =
    modalidad || "";

  nueva.ubicacion =
    ubicacion?.trim() || "";

  nueva.fechaInicio =
    fechaInicio || "";

  nueva.fechaFin =
    fechaFin || "";

  nueva.fechaRenovacion =
    fechaRenovacion || "";

  nueva.duracionHoras =
    Number(duracionHoras || 0);

  nueva.participantes =
    Number(participantes || 0);

  nueva.asistentes = 0;

  nueva.coste =
    Number(coste || 0);

  nueva.resultadoEvaluacion =
    resultadoEvaluacion || "";

  nueva.eficaciaFormacion =
    eficaciaFormacion || "";

  nueva.validadoPor =
    validadoPor || "";

  nueva.observaciones =
    observaciones || "";

  nueva.estado =
    "Planificada";

  nueva.fechaCreacion =
    obtenerFechaActual();

  nueva.fechaCierre = "";

  nueva.fechaValidacion = "";

  nueva.comentarios = [];

  nueva.evidencias = [];

  nueva.historial = [
    {
      accion:
        "Registro de formación creado",
      fecha:
        obtenerFechaActual(),
    },
  ];

  return nueva;
};

export const borrarFormacion = (
  formaciones,
  id
) => {
  return formaciones.filter(
    item => item.id !== id
  );
};

export const actualizarEstadoFormacion = (
  formaciones,
  id
) => {

  const estados = [
    "Planificada",
    "Aprobada",
    "En Curso",
    "Finalizada",
    "Pendiente Validación",
    "Validada",
  ];

  return formaciones.map(
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

        estado:
          estados[siguiente],

        fechaCierre:
          estados[siguiente] ===
          "Finalizada"
            ? obtenerFechaActual()
            : item.fechaCierre,

        fechaValidacion:
          estados[siguiente] ===
          "Validada"
            ? obtenerFechaActual()
            : item.fechaValidacion,

        historial: [
          ...(item.historial || []),
          {
            accion: `Estado cambiado a ${estados[siguiente]}`,
            fecha:
              obtenerFechaActual(),
          },
        ],
      };

    }
  );
};

export const actualizarFormacion = (
  formaciones,
  id,
  datos
) => {

  return formaciones.map(
    item =>

      item.id === id
        ? {
            ...item,

            ...datos,

            historial: [
              ...(item.historial || []),
              {
                accion:
                  "Registro actualizado",
                fecha:
                  obtenerFechaActual(),
              },
            ],
          }
        : item

  );

};

export const agregarComentarioFormacion = (
  formaciones,
  id,
  comentario
) => {

  return formaciones.map(
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
                  obtenerFechaActual(),
              },
            ],
          }
        : item

  );

};

export const agregarEvidenciaFormacion = (
  formaciones,
  id,
  evidencia
) => {

  return formaciones.map(
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
                  obtenerFechaActual(),
              },
            ],
          }
        : item

  );

};

export const eliminarEvidenciaFormacion = (
  formaciones,
  id,
  evidenciaId
) => {

  return formaciones.map(
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
                  obtenerFechaActual(),
              },
            ],
          }
        : item

  );

};

export const comprobarVigenciaFormacion = (
  fechaRenovacion
) => {

  if (!fechaRenovacion)
    return "Sin definir";

  const [dia, mes, anio] =
    fechaRenovacion
      .split("-")
      .map(Number);

  const renovacion =
    new Date(
      anio,
      mes - 1,
      dia
    );

  const hoy =
    new Date();

  return renovacion >= hoy
    ? "Vigente"
    : "Caducada";
};