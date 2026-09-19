export const calcularKPIsProveedores = (
  ncProveedores = []
) => {

  const abiertas =
    ncProveedores.filter(
      x => x.estado === "Abierta"
    ).length;

  const investigacion =
    ncProveedores.filter(
      x =>
        x.estado ===
        "En Investigación"
    ).length;

  const accionCorrectiva =
    ncProveedores.filter(
      x =>
        x.estado ===
        "Acción Correctiva"
    ).length;

  const pendienteProveedor =
    ncProveedores.filter(
      x =>
        x.estado ===
        "Pendiente Proveedor"
    ).length;

  const cerradas =
    ncProveedores.filter(
      x => x.estado === "Cerrada"
    ).length;

  const costeTotal =
    ncProveedores.reduce(
      (total, item) =>
        total +
        Number(item.costeNagrup || 0),
      0
    );

  const abonadoTotal =
    ncProveedores.reduce(
      (total, item) =>
        total +
        Number(item.importeAbonado || 0),
      0
    );

  const pendienteRecuperar =
    Math.max(
      0,
      costeTotal - abonadoTotal
    );

  const saldoEconomico =
    abonadoTotal - costeTotal;

  const ncCerradas =
    ncProveedores.filter(
      x => x.estado === "Cerrada"
    );

  const mediaResolucion =
    ncCerradas.length === 0
      ? 0
      : (
          ncCerradas.reduce(
            (total, item) =>
              total +
              Number(
                item.diasResolucion || 0
              ),
            0
          ) /
          ncCerradas.length
        ).toFixed(1);

  const proveedores = {};

  ncProveedores.forEach(item => {

    if (!item.proveedor) {
      return;
    }

    proveedores[item.proveedor] =
      (proveedores[item.proveedor] || 0) + 1;
  });

  let proveedorMasNC = "-";
  let maxProveedor = 0;

  Object.entries(proveedores)
    .forEach(([nombre,total]) => {

      if (total > maxProveedor) {

        maxProveedor = total;

        proveedorMasNC = nombre;
      }
    });

  const cumplimiento =
    ncProveedores.length === 0
      ? 0
      : (
          (cerradas /
            ncProveedores.length) *
          100
        ).toFixed(1);

  return {
    abiertas,
    investigacion,
    accionCorrectiva,
    pendienteProveedor,
    cerradas,
    costeTotal,
    abonadoTotal,
    pendienteRecuperar,
    saldoEconomico,
    mediaResolucion,
    proveedorMasNC,
    cumplimiento,
    total:
      ncProveedores.length,
  };
};