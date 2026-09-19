import { z } from "zod";

// Acepta DD/MM/YYYY o DD-MM-YYYY, ya que las distintas pantallas de
// Formación usan uno u otro separador según el campo.
const fechaValida = (valor) => {
  if (!valor) {
    return true;
  }

  const regex =
    /^(0[1-9]|[12][0-9]|3[01])[/-](0[1-9]|1[0-2])[/-]\d{4}$/;

  if (!regex.test(valor)) {
    return false;
  }

  const [dia, mes, anio] = valor
    .split(/[/-]/)
    .map(Number);

  const fecha = new Date(anio, mes - 1, dia);

  return (
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia
  );
};

const numeroOpcional = (mensaje) =>
  z
    .string()
    .trim()
    .refine((v) => v === "" || !isNaN(Number(v)), {
      message: mensaje,
    });

const fechaOpcional = (mensaje) =>
  z
    .string()
    .trim()
    .refine(fechaValida, { message: mensaje });

export const formacionSchema = z.object({
  /* EMPLEADO */

  empleado: z
    .string()
    .trim()
    .min(2, "El empleado es obligatorio"),

  puesto: z.string().trim().optional(),

  departamento: z.string().trim().optional(),

  /* FORMACIÓN */

  curso: z
    .string()
    .trim()
    .min(2, "El curso es obligatorio"),

  categoria: z.string().trim().optional(),

  proveedor: z.string().trim().optional(),

  modalidad: z.string().trim().optional(),

  responsable: z.string().trim().optional(),

  horas: numeroOpcional("Las horas deben ser un número válido"),

  coste: numeroOpcional("El coste debe ser un número válido"),

  /* FECHAS */

  fechaInicio: fechaOpcional(
    "La fecha de inicio debe ser válida (DD/MM/YYYY)"
  ),

  fechaFin: fechaOpcional(
    "La fecha de fin debe ser válida (DD/MM/YYYY)"
  ),

  fechaRenovacion: fechaOpcional(
    "La fecha de renovación debe ser válida (DD/MM/YYYY)"
  ),

  /* EVALUACIÓN */

  metodoEvaluacion: z.string().trim().optional(),

  resultadoEvaluacion: z.string().trim().optional(),

  nota: z.string().trim().optional(),

  competencia: z.string().trim().optional(),

  /* CERTIFICACIÓN */

  certificado: z.boolean().optional(),

  numeroCertificado: z.string().trim().optional(),

  organismoEmisor: z.string().trim().optional(),

  fechaCertificacion: fechaOpcional(
    "La fecha de certificación debe ser válida (DD-MM-YYYY)"
  ),

  requiereRenovacion: z.boolean().optional(),

  vigenciaMeses: numeroOpcional(
    "La vigencia en meses debe ser un número válido"
  ),

  vencimiento: fechaOpcional(
    "La fecha de vencimiento debe ser válida (DD-MM-YYYY)"
  ),

  /* HABILITACIONES LOGÍSTICAS */

  adr: z.string().trim().optional(),
  carretillas: z.string().trim().optional(),
  manipulacionCargas: z.string().trim().optional(),
  seguridadVial: z.string().trim().optional(),
  puenteGrua: z.string().trim().optional(),
  maquinaria: z.string().trim().optional(),

  /* ISO / RIESGO */

  obligatoria: z.boolean().optional(),

  criticidad: z.enum(["Baja", "Media", "Alta"], {
    message: "Selecciona una criticidad válida",
  }),

  evidenciaDisponible: z.boolean().optional(),

  eficaz: z.boolean().optional(),

  requisitoLegal: z.string().trim().optional(),

  /* OBSERVACIONES */

  observaciones: z.string().trim().optional(),
});
