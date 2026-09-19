/**
 * Ejecuta un schema de Zod contra unos datos y, si falla, devuelve
 * el primer mensaje de error listo para mostrar en un Alert.alert.
 * Si es válido, devuelve los datos ya normalizados por el schema
 * (por ejemplo, números convertidos con z.coerce.number()).
 *
 * Uso típico en un handler de pantalla:
 *
 *   const resultado = validar(incidenciaSchema, datosFormulario);
 *   if (!resultado.ok) {
 *     Alert.alert("Validación", resultado.mensaje);
 *     return;
 *   }
 *   // resultado.datos ya está validado y normalizado
 */
export function validar(schema, datos) {
  const resultado = schema.safeParse(datos);

  if (resultado.success) {
    return { ok: true, datos: resultado.data };
  }

  const primerError = resultado.error.issues[0];

  return {
    ok: false,
    mensaje: primerError?.message || "Datos inválidos",
  };
}
