export const calcularKPIsIncidencias = (
  incidencias = []
) => {

  // =====================
  // ESTADOS
  // =====================

  const abiertas =
    incidencias.filter(
      item =>
        item.estado === "Abierta" ||
        item.estado === "Registrada"
    ).length;

  const analisis =
    incidencias.filter(
      item =>
        item.estado ===
        "En Investigación"
    ).length;

  const acciones =
    incidencias.filter(
      item =>
        item.estado ===
          "Acción Correctiva" ||
        item.estado ===
          "Contención Aplicada"
    ).length;

  const validacion =
    incidencias.filter(
      item =>
        item.estado ===
        "Validación Eficacia"
    ).length;

  const cerradas =
    incidencias.filter(
      item =>
        item.estado ===
        "Cerrada"
    ).length;

  // =====================
  // GRAVEDAD
  // =====================

  const critica =
    incidencias.filter(
      item =>
        item.gravedad ===
        "Crítica"
    ).length;

  const alta =
    incidencias.filter(
      item =>
        item.gravedad ===
        "Alta"
    ).length;

  const media =
    incidencias.filter(
      item =>
        item.gravedad ===
        "Media"
    ).length;

  const baja =
    incidencias.filter(
      item =>
        item.gravedad ===
        "Baja"
    ).length;

  // =====================
  // TOTALES
  // =====================

  const total =
    incidencias.length;

  const costeTotal =
    incidencias.reduce(
      (acumulado, item) =>
        acumulado +
        Number(
          item.impactoEconomico ||
            0
        ),
      0
    );

  // =====================
  // CUMPLIMIENTO
  // =====================

  const cumplimiento =
    total === 0
      ? 0
      : Number(
          (
            (cerradas /
              total) *
            100
          ).toFixed(1)
        );

  // =====================
  // VENCIDAS
  // =====================

  const hoy =
    new Date();

  const vencidas =
    incidencias.filter(
      item =>
        item.estado !==
          "Cerrada" &&
        item.fechaCompromiso &&
        new Date(
          item.fechaCompromiso
        ) < hoy
    ).length;

  // =====================
  // RECURRENTES
  // =====================

  const recurrentes =
    incidencias.filter(
      item =>
        item.recurrencia ===
        true
    ).length;

  // =====================
  // ACCIONES CAPA
  // =====================

  const accionesAbiertas =
    incidencias.reduce(
      (total, item) =>
        total +
        Number(
          item.accionesAbiertas ||
            0
        ),
      0
    );

  // =====================
  // TIEMPO MEDIO CIERRE
  // =====================

  const incidenciasCerradas =
    incidencias.filter(
      item =>
        item.estado ===
        "Cerrada"
    );

  const tiempoMedioCierre =
    incidenciasCerradas.length ===
    0
      ? 0
      : Number(
          (
            incidenciasCerradas.reduce(
              (
                totalDias,
                item
              ) =>
                totalDias +
                Number(
                  item.diasResolucion ||
                    0
                ),
              0
            ) /
            incidenciasCerradas.length
          ).toFixed(1)
        );

  // =====================
  // ÁREA CON MÁS
  // INCIDENCIAS
  // =====================

  const contadorAreas = {};

  incidencias.forEach(
    item => {
      if (!item.area)
        return;

      contadorAreas[
        item.area
      ] =
        (contadorAreas[
          item.area
        ] || 0) + 1;
    }
  );

  let areaMasIncidencias =
    "-";

  let maxArea = 0;

  Object.entries(
    contadorAreas
  ).forEach(
    ([area, cantidad]) => {
      if (
        cantidad > maxArea
      ) {
        maxArea =
          cantidad;

        areaMasIncidencias =
          area;
      }
    }
  );

  // =====================
  // PROCESO CON MÁS
  // INCIDENCIAS
  // =====================

  const contadorProcesos =
    {};

  incidencias.forEach(
    item => {
      if (!item.proceso)
        return;

      contadorProcesos[
        item.proceso
      ] =
        (contadorProcesos[
          item.proceso
        ] || 0) + 1;
    }
  );

  let procesoMasIncidencias =
    "-";

  let maxProceso = 0;

  Object.entries(
    contadorProcesos
  ).forEach(
    ([
      proceso,
      cantidad,
    ]) => {
      if (
        cantidad >
        maxProceso
      ) {
        maxProceso =
          cantidad;

        procesoMasIncidencias =
          proceso;
      }
    }
  );

  // =====================
  // CATEGORÍA CON MÁS
  // INCIDENCIAS
  // =====================

  const contadorCategorias =
    {};

  incidencias.forEach(
    item => {
      if (!item.categoria)
        return;

      contadorCategorias[
        item.categoria
      ] =
        (contadorCategorias[
          item.categoria
        ] || 0) + 1;
    }
  );

  let categoriaMasIncidencias =
    "-";

  let maxCategoria = 0;

  Object.entries(
    contadorCategorias
  ).forEach(
    ([
      categoria,
      cantidad,
    ]) => {
      if (
        cantidad >
        maxCategoria
      ) {
        maxCategoria =
          cantidad;

        categoriaMasIncidencias =
          categoria;
      }
    }
  );

  // =====================
  // RETORNO
  // =====================

  return {
    abiertas,
    analisis,
    acciones,
    validacion,
    cerradas,

    critica,
    alta,
    media,
    baja,

    total,

    costeTotal,

    cumplimiento,

    vencidas,

    recurrentes,

    accionesAbiertas,

    tiempoMedioCierre,

    areaMasIncidencias,

    procesoMasIncidencias,

    categoriaMasIncidencias,
  };
};