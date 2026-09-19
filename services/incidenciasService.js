const obtenerFechaActual = () => {

  const fecha = new Date();

  const anio =
    fecha.getFullYear();

  const mes = String(
    fecha.getMonth() + 1
  ).padStart(2, "0");

  const dia = String(
    fecha.getDate()
  ).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const calcularDiasResolucion = (
  fechaInicio
) => {
  if (!fechaInicio) {
    return 0;
  }

  const separador =
    fechaInicio.includes("/")
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

const crearRegistroHistorial = (
  accion
) => ({
  fecha: new Date().toLocaleString(
    "es-ES"
  ),
  accion,
});

export const crearNuevaIncidencia = ({
  numeroIncidencia,

  area,
  proceso,
  turno,
  ubicacion,

  categoria,
  subcategoria,

  origen,

  problema,

  sku,

  cantidadAfectada,

  impactoEconomico,

  responsable,

  fechaCompromiso,

  causaRaiz,

  accionInmediata,
  accionCorrectiva,
  accionPreventiva,

  crearModeloIncidencia,
}) => {

  const nueva =
    crearModeloIncidencia();

  nueva.id =
    numeroIncidencia.trim();

  nueva.fecha =
  obtenerFechaActual();

  nueva.fechaCreacion =
    obtenerFechaActual();

  nueva.area =
    area?.trim() || "";

  nueva.proceso =
    proceso?.trim() || "";

  nueva.turno =
    turno?.trim() || "";

  nueva.ubicacion =
    ubicacion?.trim() || "";

  nueva.categoria =
    categoria?.trim() || "";

  nueva.subcategoria =
    subcategoria?.trim() || "";

  nueva.origen =
    origen?.trim() || "Interna";

  nueva.problema =
    problema?.trim() || "";

  nueva.sku =
    sku?.trim() || "";

  nueva.cantidadAfectada =
    Number(
      cantidadAfectada || 0
    );

  nueva.impactoEconomico =
    Number(
      impactoEconomico || 0
    );

  nueva.responsable =
    responsable?.trim() || "";

  nueva.fechaCompromiso =
    fechaCompromiso || "";

  nueva.causaRaiz =
    causaRaiz?.trim() || "";

  nueva.accionInmediata =
    accionInmediata?.trim() ||
    "";

  nueva.accionCorrectiva =
    accionCorrectiva?.trim() ||
    "";

  nueva.accionPreventiva =
    accionPreventiva?.trim() ||
    "";

  nueva.gravedad =
    "Media";

  nueva.estado =
    "Registrada";

  nueva.recurrencia =
    false;

  nueva.accionesAbiertas =
    accionCorrectiva
      ? 1
      : 0;

nueva.comentarios = [];

nueva.evidencias = [];

nueva.fechaCierre = "";

nueva.diasResolucion = 0;

nueva.historial = [
  crearRegistroHistorial(
    "Incidencia creada"
  ),
];
  return nueva;
};

export const borrarIncidencia = (
  incidencias,
  id
) => {
  return incidencias.filter(
    item => item.id !== id
  );
};

export const actualizarEstadoIncidencia = (
  incidencias,
  id
) => {

  const estados = [
    "Registrada",
    "En Investigación",
    "Contención Aplicada",
    "Acción Correctiva",
    "Validación Eficacia",
    "Cerrada",
  ];

  return incidencias.map(
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

      const nuevoHistorial = [
  ...(item.historial || []),
  crearRegistroHistorial(
    `Estado cambiado a ${nuevoEstado}`
  ),
];

      const cerrada =
        nuevoEstado ===
        "Cerrada";

return {
  ...item,

  estado: nuevoEstado,

  historial: nuevoHistorial,

  fechaCierre:
    cerrada
      ? obtenerFechaActual()
      : item.fechaCierre,

  diasResolucion:
    cerrada
      ? calcularDiasResolucion(
          item.fecha
        )
      : item.diasResolucion,
};
    }
  );
};

export const actualizarIncidencia = (
  incidencias,
  id,
  datos
) => {

return incidencias.map(
  item =>
    item.id === id
      ? {
          ...item,
          ...datos,

          historial: [
            ...(item.historial || []),

            crearRegistroHistorial(
              "Incidencia actualizada"
            ),
          ],
        }
      : item
);
};

export const actualizarGravedadIncidencia = (
  incidencias,
  id
) => {

  const gravedadOrden = [
    "Baja",
    "Media",
    "Alta",
    "Crítica",
  ];

  return incidencias.map(
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

const nuevaGravedad =
  gravedadOrden[siguiente];

return {
  ...item,

  gravedad: nuevaGravedad,

  historial: [
    ...(item.historial || []),

    crearRegistroHistorial(
      `Gravedad cambiada a ${nuevaGravedad}`
    ),
  ],
};
    }
  );
};

export const agregarComentarioIncidencia = (
  incidencias,
  id,
  comentario
) => {

return incidencias.map(
  item =>
    item.id === id
      ? {
          ...item,

          comentarios: [
            ...(item.comentarios ||
              []),
            comentario,
          ],

          historial: [
            ...(item.historial || []),

            crearRegistroHistorial(
              "Comentario añadido"
            ),
          ],
        }
      : item
);
};

export const agregarEvidenciaIncidencia = (
  incidencias,
  id,
  evidencia
) => {

return incidencias.map(
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
              fecha:
                new Date().toLocaleString(
                  "es-ES"
                ),

              accion:
                `Evidencia añadida: ${evidencia.nombre}`,
            },
          ],
        }
      : item
);
};

export const eliminarEvidenciaIncidencia = (
  incidencias,
  id,
  evidenciaId
) => {

  return incidencias.map(
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

export const marcarRecurrenciaIncidencia = (
  incidencias,
  id
) => {

  return incidencias.map(
    item =>
      item.id === id
        ? {
            ...item,

            recurrencia:
              !item.recurrencia,
          }
        : item
  );
};