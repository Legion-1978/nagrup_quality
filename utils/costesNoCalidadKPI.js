export const calcularCosteNoCalidad = ({
  incidencias = [],
  reclamaciones = [],
  ncProveedores = [],
}) => {

const costeIncidencias =
  incidencias.reduce(
    (total, item) =>
      total +
      Number(
        item.impactoEconomico ||
        item.coste ||
        item.costeIncidencia ||
        0
      ),
    0
  );

  const costeClientes =
    reclamaciones.reduce(
      (total, item) =>
        total +
        Number(
          item.coste || 0
        ),
      0
    );

  const costeProveedores =
    ncProveedores.reduce(
      (total, item) =>
        total +
        Number(
          item.costeNagrup ||
          item.coste ||
          0
        ),
      0
    );

  const recuperado =
    ncProveedores.reduce(
      (total, item) =>
        total +
        Number(
          item.importeAbonado ||
          item.abonoProveedor ||
          0
        ),
      0
    );

  const costeBruto =
    costeIncidencias +
    costeClientes +
    costeProveedores;

  const saldoEconomico =
    recuperado -
    costeBruto;

  const totalCasos =
    incidencias.length +
    reclamaciones.length +
    ncProveedores.length;

  const costeMedio =
    totalCasos === 0
      ? 0
      : costeBruto /
        totalCasos;

  const porcentajeIncidencias =
    costeBruto === 0
      ? 0
      : (
          (costeIncidencias /
            costeBruto) *
          100
        ).toFixed(1);

  const porcentajeClientes =
    costeBruto === 0
      ? 0
      : (
          (costeClientes /
            costeBruto) *
          100
        ).toFixed(1);

  const porcentajeProveedores =
    costeBruto === 0
      ? 0
      : (
          (costeProveedores /
            costeBruto) *
          100
        ).toFixed(1);

  return {
    totalCasos,

    costeIncidencias,
    costeClientes,
    costeProveedores,

    recuperado,

    costeBruto,

    saldoEconomico,

    costeMedio,

    porcentajeIncidencias,
    porcentajeClientes,
    porcentajeProveedores,
  };

};