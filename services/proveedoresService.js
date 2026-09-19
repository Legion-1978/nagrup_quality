export const borrarNC = (
  lista,
  id
) => {

  return lista.filter(
    item => item.id !== id
  );
};

export const actualizarGravedadNC = (
  lista,
  id
) => {

  const niveles = [
    "Baja",
    "Media",
    "Alta",
  ];

  return lista.map(item => {

    if (item.id !== id) {
      return item;
    }

    const indice =
      niveles.indexOf(
        item.gravedad || "Media"
      );

    const siguiente =
      indice === niveles.length - 1
        ? 0
        : indice + 1;

    return {
      ...item,
      gravedad:
        niveles[siguiente],
    };
  });
};

export const actualizarEstadoNC = (
  lista,
  id
) => {

  const estados = [
    "Abierta",
    "En Investigación",
    "Acción Correctiva",
    "Pendiente Proveedor",
    "Cerrada",
  ];

  return lista.map(item => {

    if (item.id !== id) {
      return item;
    }

    const indice =
      estados.indexOf(
        item.estado
      );

    const siguiente =
      indice === estados.length - 1
        ? 0
        : indice + 1;

const fechaInicio = item.fechaCreacion
  ? new Date(item.fechaCreacion)
  : (() => {

      const [
        dia,
        mes,
        anio,
      ] = item.fecha.split("/");

      return new Date(
        Number(anio),
        Number(mes) - 1,
        Number(dia)
      );

    })();

const fechaFin =
  new Date();

const diasResolucion =
  Math.max(
    1,
    Math.ceil(
      (fechaFin -
        fechaInicio) /
      (1000 *
        60 *
        60 *
        24)
    )
  );

    return {
      ...item,

      estado:
        estados[siguiente],

      fechaCierre:
        estados[siguiente] ===
        "Cerrada"
          ? new Date().toLocaleDateString(
              "es-ES"
            )
          : "",

      diasResolucion:
        estados[siguiente] ===
        "Cerrada"
          ? diasResolucion
          : 0,
    };
  });
};

export const actualizarNC = (
  lista,
  id,
  datos
) => {

  return lista.map(item => {

    if (item.id !== id) {
      return item;
    }

    return {
      ...item,
      ...datos,
    };
  });
};

export const agregarComentarioNC = (
  lista,
  id,
  comentario
) => {

  return lista.map(item => {

    if (item.id !== id) {
      return item;
    }

    return {
      ...item,

      comentarios: [
        ...(item.comentarios || []),

        comentario,
      ],
    };
  });
};

export const crearNuevaNC = ({
  codigo,
  proveedor,
  producto,
  problema,
  conclusion,
  costeNagrup,
  importeAbonado,
  crearModeloNC,
}) => {

  return {
    ...crearModeloNC(),

    uuid: Date.now().toString(),

    id: codigo.trim(),

    fecha:
      new Date().toLocaleDateString(
        "es-ES"
      ),

    fechaCreacion:
      new Date().toISOString(),

    proveedor:
      proveedor.trim(),

    codigoProducto:
      producto.trim(),

    problema:
      problema.trim(),

    conclusion:
      conclusion.trim(),

    costeNagrup:
      Number(costeNagrup || 0),

    importeAbonado:
      Number(
        importeAbonado || 0
      ),
  };
};

export const agregarEvidenciaNC = (
  lista,
  id,
  evidencia
) => {

  return lista.map(item => {

    if (item.id !== id) {
      return item;
    }

    return {

      ...item,

      evidencias: [
        ...(item.evidencias || []),
        evidencia,
      ],

    };

  });

};