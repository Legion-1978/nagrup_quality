export const calcularKPIsMejoras = (
  mejoras = []
) => {

  const propuestas =
    mejoras.filter(
      item =>
        item.estado ===
        "Propuesta"
    ).length;

  const aprobadas =
    mejoras.filter(
      item =>
        item.estado ===
        "Aprobada"
    ).length;

  const enCurso =
    mejoras.filter(
      item =>
        item.estado ===
        "En Curso"
    ).length;

  const implantadas =
    mejoras.filter(
      item =>
        item.estado ===
        "Implantada"
    ).length;

  const cerradas =
    mejoras.filter(
      item =>
        item.estado ===
        "Cerrada"
    ).length;

  const prioridadAlta =
    mejoras.filter(
      item =>
        item.prioridad ===
        "Alta"
    ).length;

  const prioridadMedia =
    mejoras.filter(
      item =>
        item.prioridad ===
        "Media"
    ).length;

  const prioridadBaja =
    mejoras.filter(
      item =>
        item.prioridad ===
        "Baja"
    ).length;

  const impactoAlto =
    mejoras.filter(
      item =>
        item.impacto ===
        "Alto"
    ).length;

  const impactoMedio =
    mejoras.filter(
      item =>
        item.impacto ===
        "Medio"
    ).length;

  const impactoBajo =
    mejoras.filter(
      item =>
        item.impacto ===
        "Bajo"
    ).length;

  const cumplimiento =
    mejoras.length === 0
      ? 0
      : Number(
          (
            (cerradas /
              mejoras.length) *
            100
          ).toFixed(1)
        );

  const ahorroTotal =
    mejoras.reduce(
      (total, item) =>
        total +
        Number(
          item.ahorro || 0
        ),
      0
    );

  const accionesAbiertas =
    mejoras.reduce(
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
            mejoras
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

  const responsablePendiente =
    mejoras.find(
      item =>
        item.estado !==
        "Cerrada"
    )?.responsable || "-";

  return {

    propuestas,
    aprobadas,
    enCurso,
    implantadas,
    cerradas,

    prioridadAlta,
    prioridadMedia,
    prioridadBaja,

    impactoAlto,
    impactoMedio,
    impactoBajo,

    cumplimiento,

    ahorroTotal,

    accionesAbiertas,

    mediaResolucion,

    responsablePendiente,

  };

};