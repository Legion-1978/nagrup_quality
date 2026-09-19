import { z } from "zod";

export const ncProveedorSchema = z.object({
  proveedor: z
    .string()
    .trim()
    .min(
      2,
      "El proveedor es obligatorio"
    ),

  responsable: z
    .string()
    .trim()
    .min(
      2,
      "El responsable es obligatorio"
    ),

  evaluador: z
    .string()
    .trim()
    .min(
      2,
      "El evaluador es obligatorio"
    ),

  producto: z
    .string()
    .trim()
    .min(
      1,
      "El producto es obligatorio"
    ),

  lote: z
    .string()
    .trim()
    .min(
      1,
      "El lote es obligatorio"
    ),

  pedidoCompra: z
    .string()
    .trim()
    .min(
      1,
      "El pedido de compra es obligatorio"
    ),

  tipoNC: z
    .string()
    .trim()
    .min(
      1,
      "El tipo de no conformidad es obligatorio"
    ),

  impacto: z
    .string()
    .trim()
    .min(
      1,
      "El impacto es obligatorio"
    ),

  problema: z
    .string()
    .trim()
    .min(
      10,
      "Describe el problema con al menos 10 caracteres"
    ),

  causaRaiz: z
    .string()
    .trim()
    .optional(),

  accionInmediata: z
    .string()
    .trim()
    .optional(),

  accionCorrectiva: z
    .string()
    .trim()
    .optional(),

  respuestaProveedor: z
    .string()
    .trim()
    .optional(),

  conclusion: z
    .string()
    .trim()
    .optional(),

  verificacionEficacia: z
    .string()
    .trim()
    .optional(),

  costeNagrup: z
    .string()
    .trim()
    .refine(
      (v) =>
        v === "" ||
        !isNaN(Number(v)),
      {
        message:
          "El coste Nagrup debe ser un número válido",
      }
    ),

  importeAbonado: z
    .string()
    .trim()
    .refine(
      (v) =>
        v === "" ||
        !isNaN(Number(v)),
      {
        message:
          "El importe recuperado debe ser un número válido",
      }
    ),
});