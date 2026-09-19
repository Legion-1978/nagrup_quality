import { clasificarNPS } from "../services/satisfaccionService";

const media = valores => {

  const validos = valores.filter(
    v => v !== null && v !== undefined && v !== ""
  );

  if (validos.length === 0) {
    return 0;
  }

  const suma = validos.reduce(
    (total, v) => total + Number(v),
    0
  );

  return Number(
    (suma / validos.length).toFixed(1)
  );

};

export const calcularKPIsSatisfaccion = (
  registros = []
) => {

  const total = registros.length;

  const conNPS = registros.filter(
    item =>
      item.nps !== null &&
      item.nps !== undefined &&
      item.nps !== ""
  );

  const promotores = conNPS.filter(
    item => clasificarNPS(item.nps) === "Promotor"
  ).length;

  const pasivos = conNPS.filter(
    item => clasificarNPS(item.nps) === "Pasivo"
  ).length;

  const detractores = conNPS.filter(
    item => clasificarNPS(item.nps) === "Detractor"
  ).length;

  const nps =
    conNPS.length === 0
      ? 0
      : Math.round(
          ((promotores - detractores) /
            conNPS.length) *
            100
        );

  const notaCalidadMedia = media(
    registros.map(item => item.notaCalidad)
  );

  const notaPlazoMedia = media(
    registros.map(item => item.notaPlazo)
  );

  const notaComunicacionMedia = media(
    registros.map(item => item.notaComunicacion)
  );

  const notaPrecioMedia = media(
    registros.map(item => item.notaPrecio)
  );

  const seguimientosPendientes = registros.filter(
    item =>
      item.requiereSeguimiento &&
      item.estado !== "Cerrada"
  ).length;

  const pendientes = registros.filter(
    item => item.estado === "Pendiente"
  ).length;

  const clientes = {};

  registros.forEach(item => {

    if (!item.cliente) {
      return;
    }

    if (!clientes[item.cliente]) {
      clientes[item.cliente] = [];
    }

    if (
      item.nps !== null &&
      item.nps !== undefined &&
      item.nps !== ""
    ) {
      clientes[item.cliente].push(
        Number(item.nps)
      );
    }

  });

  let clientePeorValorado = "-";

  let peorMedia = 11;

  Object.entries(clientes).forEach(
    ([cliente, notas]) => {

      if (notas.length === 0) {
        return;
      }

      const mediaCliente =
        notas.reduce((a, b) => a + b, 0) /
        notas.length;

      if (mediaCliente < peorMedia) {
        peorMedia = mediaCliente;
        clientePeorValorado = cliente;
      }

    }
  );

  return {
    total,

    promotores,
    pasivos,
    detractores,

    nps,

    notaCalidadMedia,
    notaPlazoMedia,
    notaComunicacionMedia,
    notaPrecioMedia,

    seguimientosPendientes,
    pendientes,

    clientePeorValorado,
  };

};
