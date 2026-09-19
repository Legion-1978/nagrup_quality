import {
  crearModeloProcedimiento,
} from "../models/Procedimiento";

const obtenerFechaActual = () => {

  const fecha = new Date();

  const dia = String(
    fecha.getDate()
  ).padStart(2, "0");

  const mes = String(
    fecha.getMonth() + 1
  ).padStart(2, "0");

  const anio =
    fecha.getFullYear();

  return `${dia}-${mes}-${anio}`;

};

export const crearNuevoProcedimiento = ({
  codigo,
  procedimiento,
  responsable,
  departamento,
  version,
  fecha,
}) => {

  const nuevo =
    crearModeloProcedimiento();

  nuevo.id =
    `PROC-${Date.now()}`;

  nuevo.codigo =
    codigo.trim();

  nuevo.procedimiento =
    procedimiento.trim();

  nuevo.responsable =
    responsable.trim();

  nuevo.departamento =
    departamento;

  nuevo.version =
    version;

  nuevo.fecha =
    fecha;

  nuevo.propietario =
    responsable.trim();

  nuevo.fechaRegistro =
    new Date().toISOString();

  nuevo.fechaUltimaRevision =
    new Date().toISOString();

  return nuevo;

};

export const borrarProcedimiento = (
  procedimientos,
  id
) => {

  return procedimientos.filter(
    item => item.id !== id
  );

};

export const actualizarProcedimiento = (
  procedimientos,
  id,
  datos
) => {

  return procedimientos.map(
    item =>

      item.id === id
        ? {
            ...item,
            ...datos,
            fechaUltimaRevision:
              new Date().toISOString(),
          }
        : item

  );

};

export const actualizarEstadoProcedimiento = (
  procedimientos,
  id
) => {

  const estados = [
    "Vigente",
    "En Revisión",
    "Obsoleto",
  ];

  return procedimientos.map(
    item => {

      if (item.id !== id) {
        return item;
      }

      const indice =
        estados.indexOf(
          item.estado
        );

      const siguiente =
        indice ===
        estados.length - 1
          ? 0
          : indice + 1;

      return {

        ...item,

        estado:
          estados[siguiente],

        fechaUltimaRevision:
          new Date().toISOString(),

      };

    }
  );

};

export const actualizarCriticidadProcedimiento = (
  procedimientos,
  id
) => {

  const niveles = [
    "Baja",
    "Media",
    "Alta",
  ];

  return procedimientos.map(
    item => {

      if (item.id !== id) {
        return item;
      }

      const indice =
        niveles.indexOf(
          item.criticidad
        );

      const siguiente =
        indice ===
        niveles.length - 1
          ? 0
          : indice + 1;

      return {
        ...item,
        criticidad:
          niveles[siguiente],
      };

    }
  );

};

export const agregarComentarioProcedimiento = (
  procedimientos,
  id,
  comentario
) => {

  return procedimientos.map(
    item =>

      item.id === id
        ? {
            ...item,

            comentarios: [
              ...(item.comentarios || []),
              comentario,
            ],
          }
        : item

  );

};

export const agregarEvidenciaProcedimiento = (
  procedimientos,
  id,
  evidencia
) => {

  return procedimientos.map(
    item =>

      item.id === id
        ? {
            ...item,

            evidencias: [
              ...(item.evidencias || []),
              evidencia,
            ],
          }
        : item

  );

};

export const eliminarEvidenciaProcedimiento = (
  procedimientos,
  id,
  evidenciaId
) => {

  return procedimientos.map(
    item =>

      item.id === id
        ? {
            ...item,

            evidencias:
              item.evidencias?.filter(
                evidencia =>
                  evidencia.id !==
                  evidenciaId
              ) || [],
          }
        : item

  );

};

export const actualizarFechaRevisionProcedimiento = (
  procedimientos,
  id,
  fechaRevision
) => {

  return procedimientos.map(
    item =>

      item.id === id
        ? {
            ...item,

            fechaRevision,

            fechaUltimaRevision:
              new Date().toISOString(),
          }
        : item

  );

};

export const actualizarProximaRevisionProcedimiento = (
  procedimientos,
  id,
  fechaProximaRevision
) => {

  return procedimientos.map(
    item =>

      item.id === id
        ? {
            ...item,

            fechaProximaRevision,

            fechaUltimaRevision:
              new Date().toISOString(),
          }
        : item

  );

};

export const obtenerProcedimientosVencidos = (
  procedimientos
) => {

  const hoy =
    new Date();

  return procedimientos.filter(
    item => {

      if (
        !item.fechaProximaRevision
      ) {
        return false;
      }

      return (
        new Date(
          item.fechaProximaRevision
        ) < hoy
      );

    }
  );

};

export const calcularCumplimientoProcedimientos = (
  procedimientos
) => {

  const total =
    procedimientos.length;

  if (total === 0) {
    return 0;
  }

  const vigentes =
    procedimientos.filter(
      item =>
        item.estado ===
        "Vigente"
    ).length;

  return Number(
    (
      (vigentes / total) *
      100
    ).toFixed(1)
  );

};

export const generarRevisionAnual = (
  procedimiento
) => {

  return {
    ...procedimiento,

    fechaRevision:
      obtenerFechaActual(),

    fechaUltimaRevision:
      new Date().toISOString(),
  };

};