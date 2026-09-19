import { z } from "zod";

export const auditoriaSchema = z.object({
  tipo: z
    .string()
    .trim()
    .min(
      2,
      "El tipo de auditoría es obligatorio"
    ),

  norma: z
    .string()
    .trim()
    .min(
      2,
      "La norma es obligatoria"
    ),

  auditor: z
    .string()
    .trim()
    .min(
      2,
      "El auditor es obligatorio"
    ),

  responsableAuditado: z
    .string()
    .trim()
    .min(
      2,
      "El responsable auditado es obligatorio"
    ),

  alcance: z
    .string()
    .trim()
    .min(
      5,
      "El alcance es obligatorio"
    ),

  criterioAuditoria: z
    .string()
    .trim()
    .min(
      5,
      "El criterio de auditoría es obligatorio"
    ),

fecha: z
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
      new Date(anio, mes - 1, dia);

    return (
      fechaObj.getFullYear() === anio &&
      fechaObj.getMonth() === mes - 1 &&
      fechaObj.getDate() === dia
    );

  }, {
    message:
      "Introduce una fecha válida (DD/MM/YYYY)",
  }),

  resultado: z
    .string()
    .trim()
    .min(
      2,
      "El resultado es obligatorio"
    ),

  conclusion: z
    .string()
    .trim()
    .min(
      10,
      "La conclusión debe tener al menos 10 caracteres"
    ),
});