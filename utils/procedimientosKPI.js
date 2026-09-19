export const calcularKPIsProcedimientos = (
  procedimientos = []
) => {

  const total =
    procedimientos.length;

  const vigentes =
    procedimientos.filter(
      item =>
        item.estado ===
        "Vigente"
    ).length;

  const enRevision =
    procedimientos.filter(
      item =>
        item.estado ===
        "En Revisión"
    ).length;

  const borradores =
    procedimientos.filter(
      item =>
        item.estado ===
        "Borrador"
    ).length;

  const obsoletos =
    procedimientos.filter(
      item =>
        item.estado ===
        "Obsoleto"
    ).length;

  const criticidadAlta =
    procedimientos.filter(
      item =>
        item.criticidad ===
        "Alta"
    ).length;

  const criticidadMedia =
    procedimientos.filter(
      item =>
        item.criticidad ===
        "Media"
    ).length;

  const criticidadBaja =
    procedimientos.filter(
      item =>
        item.criticidad ===
        "Baja"
    ).length;

  const evidenciasTotales =
    procedimientos.reduce(
      (total, item) =>
        total +
        (
          item.evidencias?.length ||
          0
        ),
      0
    );

  const comentariosTotales =
    procedimientos.reduce(
      (total, item) =>
        total +
        (
          item.comentarios?.length ||
          0
        ),
      0
    );

  const cumplimiento =
    total === 0
      ? 0
      : Number(
          (
            (vigentes / total) *
            100
          ).toFixed(1)
        );

  const hoy = new Date();

  const revisionesProximas =
    procedimientos.filter(
      item => {

        if (
          !item.fechaRevision
        ) {
          return false;
        }

        const fecha =
          new Date(
            item.fechaRevision
          );

        const dias =
          (
            fecha - hoy
          ) /
          (
            1000 *
            60 *
            60 *
            24
          );

        return (
          dias >= 0 &&
          dias <= 90
        );

      }
    ).length;

  const revisionesVencidas =
    procedimientos.filter(
      item => {

        if (
          !item.fechaRevision
        ) {
          return false;
        }

        return (
          new Date(
            item.fechaRevision
          ) < hoy
        );

      }
    ).length;

  const responsablePrincipal =
    Object.entries(

      procedimientos.reduce(
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

    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      )[0]?.[0] || "-";

  return {

    total,

    vigentes,
    enRevision,
    borradores,
    obsoletos,

    cumplimiento,

    criticidadAlta,
    criticidadMedia,
    criticidadBaja,

    evidenciasTotales,
    comentariosTotales,

    revisionesProximas,
    revisionesVencidas,

    responsablePrincipal,

  };
};