export const calcularKPIsFormacion = (
  formaciones = []
) => {

  const total =
    formaciones.length;

  const planificadas =
    formaciones.filter(
      item =>
        item.estadoFormacion ===
        "Planificada"
    ).length;

  const enCurso =
    formaciones.filter(
      item =>
        item.estadoFormacion ===
        "En Curso"
    ).length;

  const completadas =
    formaciones.filter(
      item =>
        item.estadoFormacion ===
        "Completada"
    ).length;

  const cumplimiento =
    total === 0
      ? 0
      : Number(
          (
            (completadas / total) *
            100
          ).toFixed(1)
        );

  const horasTotales =
    formaciones.reduce(
      (totalHoras, item) =>
        totalHoras +
        Number(item.horas || 0),
      0
    );

  const costeTotal =
    formaciones.reduce(
      (totalCoste, item) =>
        totalCoste +
        Number(item.coste || 0),
      0
    );

  const certificados =
    formaciones.filter(
      item => item.certificado
    ).length;

  const sinCertificar =
    formaciones.filter(
      item => !item.certificado
    ).length;

  const obligatorias =
    formaciones.filter(
      item => item.obligatoria
    ).length;

  const evaluacionesAprobadas =
    formaciones.filter(
      item =>
        item.resultadoEvaluacion ===
          "Apto" ||
        item.resultado ===
          "Apto"
    ).length;

  const evaluacionesNoAprobadas =
    formaciones.filter(
      item =>
        item.resultadoEvaluacion ===
          "No Apto" ||
        item.resultado ===
          "No Apto"
    ).length;

  const fechaActual =
    new Date();

  const proximasRenovaciones =
    formaciones.filter(item => {

      if (!item.fechaRenovacion) {
        return false;
      }

      const fecha =
        new Date(
          item.fechaRenovacion
        );

      const diferenciaDias =
        (
          fecha -
          fechaActual
        ) /
        (1000 * 60 * 60 * 24);

      return (
        diferenciaDias >= 0 &&
        diferenciaDias <= 90
      );

    }).length;

  const vencidas =
    formaciones.filter(item => {

      if (!item.fechaRenovacion) {
        return false;
      }

      return (
        new Date(
          item.fechaRenovacion
        ) < fechaActual
      );

    }).length;

  const responsablePrincipal =
    Object.entries(

      formaciones.reduce(
        (acc, item) => {

          if (
            item.responsable
          ) {
            acc[
              item.responsable
            ] =
              (
                acc[
                  item.responsable
                ] || 0
              ) + 1;
          }

          return acc;
        },
        {}
      )

    ).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "-";

  return {

    total,

    planificadas,
    enCurso,
    completadas,

    cumplimiento,

    horasTotales,
    costeTotal,

    certificados,
    sinCertificar,

    obligatorias,

    evaluacionesAprobadas,
    evaluacionesNoAprobadas,

    proximasRenovaciones,
    vencidas,

    responsablePrincipal,

  };
};