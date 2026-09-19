import { z } from "zod";

export const satisfaccionClienteSchema =
  z.object({

    cliente: z
      .string()
      .trim()
      .min(
        2,
        "El cliente es obligatorio"
      ),

    responsable: z
      .string()
      .trim()
      .min(
        2,
        "El responsable es obligatorio"
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
          "Introduce una fecha válida (DD/MM/YYYY)",
      }),

    canal: z
      .string()
      .trim()
      .min(
        1,
        "Selecciona un canal"
      ),

    nps: z
      .string()
      .refine(
        valor => {

          const numero =
            Number(valor);

          return (
            !isNaN(numero) &&
            numero >= 0 &&
            numero <= 10
          );

        },
        {
          message:
            "El NPS debe estar entre 0 y 10",
        }
      ),

    notaCalidad: z
      .string()
      .refine(
        valor =>
          ["1", "2", "3", "4", "5"]
            .includes(valor),
        {
          message:
            "Indica la nota de calidad",
        }
      ),

    notaPlazo: z
      .string()
      .refine(
        valor =>
          ["1", "2", "3", "4", "5"]
            .includes(valor),
        {
          message:
            "Indica la nota de plazo",
        }
      ),

    notaComunicacion: z
      .string()
      .refine(
        valor =>
          ["1", "2", "3", "4", "5"]
            .includes(valor),
        {
          message:
            "Indica la nota de comunicación",
        }
      ),

    notaPrecio: z
      .string()
      .refine(
        valor =>
          ["1", "2", "3", "4", "5"]
            .includes(valor),
        {
          message:
            "Indica la nota de precio",
        }
      ),

    comentario: z
      .string()
      .trim()
      .min(
        5,
        "El comentario es obligatorio"
      ),

  });