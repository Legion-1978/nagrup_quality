import { z } from "zod";

export const mejoraSchema = z.object({

  titulo: z
    .string()
    .trim()
    .min(
      3,
      "El título es obligatorio"
    ),

  descripcion: z
    .string()
    .trim()
    .min(
      10,
      "La descripción debe tener al menos 10 caracteres"
    ),

  tipo: z
    .string()
    .trim()
    .min(
      2,
      "El tipo es obligatorio"
    ),

  origen: z
    .string()
    .trim()
    .min(
      2,
      "El origen es obligatorio"
    ),

  area: z
    .string()
    .trim()
    .min(
      2,
      "El área es obligatoria"
    ),

  responsable: z
    .string()
    .trim()
    .min(
      2,
      "El responsable es obligatorio"
    ),

  accionPropuesta: z
    .string()
    .trim()
    .min(
      10,
      "La acción propuesta es obligatoria"
    ),

  fechaInicio: z
    .string()
    .trim()
    .refine(valor => {

      const regex =
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (!regex.test(valor)) {
        return false;
      }

      const [dia, mes, anio] =
        valor.split("/").map(Number);

      const fechaObj =
        new Date(
          anio,
          mes - 1,
          dia
        );

      return (
        fechaObj.getFullYear() === anio &&
        fechaObj.getMonth() === mes - 1 &&
        fechaObj.getDate() === dia
      );

    }, {
      message:
        "La fecha inicio debe ser válida (DD/MM/YYYY)",
    }),

  fechaObjetivo: z
    .string()
    .trim()
    .refine(valor => {

      const regex =
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (!regex.test(valor)) {
        return false;
      }

      const [dia, mes, anio] =
        valor.split("/").map(Number);

      const fechaObj =
        new Date(
          anio,
          mes - 1,
          dia
        );

      return (
        fechaObj.getFullYear() === anio &&
        fechaObj.getMonth() === mes - 1 &&
        fechaObj.getDate() === dia
      );

    }, {
      message:
        "La fecha objetivo debe ser válida (DD/MM/YYYY)",
    }),

  beneficio: z
    .string()
    .refine(
      valor =>
        valor === "" ||
        !isNaN(Number(valor)),
      {
        message:
          "El beneficio debe ser numérico",
      }
    ),

  ahorroEstimado: z
    .string()
    .refine(
      valor =>
        valor === "" ||
        !isNaN(Number(valor)),
      {
        message:
          "El ahorro estimado debe ser numérico",
      }
    ),

  costeProyecto: z
    .string()
    .refine(
      valor =>
        valor === "" ||
        !isNaN(Number(valor)),
      {
        message:
          "El coste del proyecto debe ser numérico",
      }
    ),

});