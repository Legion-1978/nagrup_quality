import { z } from "zod";

export const incidenciaSchema = z.object({
  categoria: z
    .string()
    .trim()
    .min(1, "La categoría es obligatoria"),

  problema: z
    .string()
    .trim()
    .min(
      10,
      "Describe el problema con al menos 10 caracteres"
    ),

  cantidadAfectada: z
    .string()
    .trim()
    .refine(
      (v) => !isNaN(Number(v)),
      {
        message:
          "La cantidad afectada debe ser un número válido",
      }
    ),

  impactoEconomico: z
    .string()
    .trim()
    .refine(
      (v) => !isNaN(Number(v)),
      {
        message:
          "El impacto económico debe ser un número válido",
      }
    ),
});