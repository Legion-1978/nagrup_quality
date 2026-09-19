export const calcularKPIsReclamaciones = (
  reclamaciones = []
) => {

  const abiertas =
    reclamaciones.filter(
      x => x.estado === "Abierta"
    ).length;

  const investigacion =
    reclamaciones.filter(
      x =>
        x.estado ===
        "En Investigación"
    ).length;

  const accionCorrectiva =
    reclamaciones.filter(
      x =>
        x.estado ===
        "Acción Correctiva"
    ).length;

  const pendienteCliente =
    reclamaciones.filter(
      x =>
        x.estado ===
        "Pendiente Cliente"
    ).length;

  const cerradas =
    reclamaciones.filter(
      x => x.estado === "Cerrada"
    ).length;

  const total =
    reclamaciones.length;

  const costeTotal =
    reclamaciones.reduce(
      (total, item) =>
        total +
        Number(item.coste || 0),
      0
    );

  const compensacionTotal =
    reclamaciones.reduce(
      (total, item) =>
        total +
        Number(
          item.compensacion || 0
        ),
      0
    );

  const saldoEconomico =
    compensacionTotal -
    costeTotal;

  const cumplimiento =
    total === 0
      ? 0
      : (
          (cerradas / total) *
          100
        ).toFixed(1);

  const cerradasArray =
    reclamaciones.filter(
      x => x.estado === "Cerrada"
    );

  const mediaResolucion =
    cerradasArray.length === 0
      ? 0
      : (
          cerradasArray.reduce(
            (total, item) =>
              total +
              Number(
                item.diasResolucion || 0
              ),
            0
          ) /
          cerradasArray.length
        ).toFixed(1);

  const clientes = {};

  reclamaciones.forEach(item => {

    if (!item.cliente) {
      return;
    }

    clientes[item.cliente] =
      (clientes[item.cliente] || 0) + 1;

  });

  let clienteMasReclamado =
    "-";

  let max = 0;

  Object.entries(clientes).forEach(
    ([cliente, total]) => {

      if (total > max) {

        max = total;

        clienteMasReclamado =
          cliente;

      }

    }
  );

return {
  abiertas,
  investigacion,
  accionCorrectiva,
  pendienteCliente,
  cerradas,

  total,

  costeTotal,
  compensacionTotal,
  saldoEconomico,

  cumplimiento,
  mediaResolucion,

  clienteMasReclamado,
};

};