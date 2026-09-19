// schemas/reclamacionSchema.js

import { z } from "zod";

export const reclamacionSchema = z.object({
  cliente: z
    .string()
    .trim()
    .min(
      2,
      "El cliente es obligatorio"
    ),

  descripcion: z
    .string()
    .trim()
    .min(
      10,
      "Describe la reclamación con al menos 10 caracteres"
    ),

  responsable: z
    .string()
    .trim()
    .min(
      2,
      "Indica un responsable"
    ),

  fecha: z
    .string()
    .trim()
    .min(
      1,
      "La fecha es obligatoria"
    ),

  gravedad: z.enum(
    ["Baja", "Media", "Alta"],
    {
      message:
        "Selecciona una gravedad válida",
    }
  ),

  producto: z
    .string()
    .trim()
    .min(
      1,
      "El producto es obligatorio"
    ),

  pedido: z
    .string()
    .trim()
    .min(
      1,
      "El número de pedido es obligatorio"
    ),

  lote: z
    .string()
    .trim()
    .min(
      1,
      "El lote es obligatorio"
    ),

  coste: z
    .string()
    .trim()
    .refine(
      (v) =>
        v === "" ||
        !isNaN(Number(v)),
      {
        message:
          "El coste debe ser un número válido",
      }
    ),

  compensacion: z
    .string()
    .trim()
    .refine(
      (v) =>
        v === "" ||
        !isNaN(Number(v)),
      {
        message:
          "La compensación debe ser un número válido",
      }
    ),

  causaRaiz: z
    .string()
    .optional(),

  accionCorrectiva: z
    .string()
    .optional(),
});