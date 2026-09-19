export const calcularKPIsAuditorias = (
  auditorias = []
) => {

  const abiertas =
    auditorias.filter(
      item =>
        item.estado ===
        "Planificada"
    ).length;

  const ejecucion =
    auditorias.filter(
      item =>
        item.estado ===
        "En Ejecución"
    ).length;

  const seguimiento =
    auditorias.filter(
      item =>
        item.estado ===
        "Seguimiento"
    ).length;

  const cerradas =
    auditorias.filter(
      item =>
        item.estado ===
        "Cerrada"
    ).length;

  const internas =
    auditorias.filter(
      item =>
        item.tipo ===
        "Interna"
    ).length;

  const externas =
    auditorias.filter(
      item =>
        item.tipo ===
        "Externa"
    ).length;

  const certificacion =
    auditorias.filter(
      item =>
        item.tipo ===
        "Certificación"
    ).length;

  const cumplimiento =
    auditorias.length === 0
      ? 0
      : Number(
          (
            (cerradas /
              auditorias.length) *
            100
          ).toFixed(1)
        );

  const hallazgos =
    auditorias.reduce(
      (total, item) =>
        total +
        (
          item.hallazgos?.length ||
          0
        ),
      0
    );

  const ncAbiertas =
    auditorias.reduce(
      (total, item) =>
        total +
        Number(
          item.ncAbiertas || 0
        ),
      0
    );

  const accionesAbiertas =
    auditorias.reduce(
      (total, item) =>
        total +
        Number(
          item.accionesAbiertas ||
            0
        ),
      0
    );

  const mediaResolucion =
    cerradas === 0
      ? 0
      : Number(
          (
            auditorias
              .filter(
                item =>
                  item.estado ===
                  "Cerrada"
              )
              .reduce(
                (
                  total,
                  item
                ) =>
                  total +
                  Number(
                    item.diasResolucion ||
                      0
                  ),
                0
              ) / cerradas
          ).toFixed(1)
        );

  const auditorPendiente =
    auditorias.find(
      item =>
        item.estado !==
        "Cerrada"
    )?.auditor || "-";

  return {

    abiertas,

    ejecucion,

    seguimiento,

    cerradas,

    internas,

    externas,

    certificacion,

    cumplimiento,

    hallazgos,

    ncAbiertas,

    accionesAbiertas,

    mediaResolucion,

    auditorPendiente,

  };

};