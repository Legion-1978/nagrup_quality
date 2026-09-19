import { z } from "zod";

const fechaValida = valor => {

  const regex =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!regex.test(valor)) {
    return false;
  }

  const [dia, mes, anio] =
    valor.split("/").map(Number);

  const fecha =
    new Date(
      anio,
      mes - 1,
      dia
    );

  return (
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia
  );
};

export const procedimientoSchema =
  z.object({

    titulo: z
      .string()
      .trim()
      .min(
        3,
        "El título es obligatorio"
      ),

    tipo: z
      .string()
      .trim()
      .min(
        2,
        "El tipo es obligatorio"
      ),

    categoria: z
      .string()
      .trim()
      .min(
        2,
        "La categoría es obligatoria"
      ),

    responsable: z
      .string()
      .trim()
      .min(
        2,
        "El responsable es obligatorio"
      ),

    departamento: z
      .string()
      .trim()
      .min(
        2,
        "El departamento es obligatorio"
      ),

    propietarioProceso: z
      .string()
      .trim()
      .min(
        2,
        "El propietario del proceso es obligatorio"
      ),

    aprobador: z
      .string()
      .trim()
      .min(
        2,
        "El aprobador es obligatorio"
      ),

    descripcion: z
      .string()
      .trim()
      .min(
        10,
        "La descripción debe tener al menos 10 caracteres"
      ),

    objetivo: z
      .string()
      .trim()
      .min(
        5,
        "El objetivo es obligatorio"
      ),

    alcance: z
      .string()
      .trim()
      .min(
        5,
        "El alcance es obligatorio"
      ),

    proceso: z
      .string()
      .trim()
      .min(
        10,
        "El proceso es obligatorio"
      ),

    version: z
      .string()
      .trim()
      .min(
        1,
        "La versión es obligatoria"
      ),

    estado: z
      .string()
      .trim()
      .min(
        1,
        "El estado es obligatorio"
      ),

    fechaEmision: z
      .string()
      .refine(
        fechaValida,
        {
          message:
            "Fecha de emisión inválida (DD/MM/YYYY)"
        }
      ),

    fechaRevision: z
      .string()
      .refine(
        fechaValida,
        {
          message:
            "Fecha de revisión inválida (DD/MM/YYYY)"
        }
      ),

    fechaProximaRevision: z
      .string()
      .refine(
        fechaValida,
        {
          message:
            "Fecha próxima revisión inválida (DD/MM/YYYY)"
        }
      ),

  });