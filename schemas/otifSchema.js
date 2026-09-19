import { z } from "zod";

export const otifSchema = z.object({

  cliente: z
    .string()
    .trim()
    .min(
      2,
      "El cliente es obligatorio"
    ),

  pedido: z
    .string()
    .trim()
    .min(
      1,
      "El pedido es obligatorio"
    ),

  fechaPrevista: z
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

    }, {
      message:
        "La fecha prevista debe tener formato DD/MM/YYYY"
    }),

  fechaEntrega: z
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

    }, {
      message:
        "La fecha de entrega debe tener formato DD/MM/YYYY"
    }),

  cantidadPedida: z
    .string()
    .refine(
      valor =>
        !isNaN(Number(valor)) &&
        Number(valor) > 0,
      {
        message:
          "La cantidad pedida debe ser mayor que 0"
      }
    ),

  cantidadEntregada: z
    .string()
    .refine(
      valor =>
        !isNaN(Number(valor)) &&
        Number(valor) >= 0,
      {
        message:
          "La cantidad entregada debe ser numérica"
      }
    ),

  transportista: z
    .string()
    .trim()
    .min(
      2,
      "El transportista es obligatorio"
    ),

});