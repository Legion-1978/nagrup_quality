import { supabase } from "./supabase";

const TABLA = "configuracion";
const ID_APP = "app";

export async function obtenerConfiguracion() {
  const { data, error } = await supabase
    .from(TABLA)
    .select("*")
    .eq("id", ID_APP)
    .maybeSingle();

  if (error) {
    console.error("SUPABASE ERROR (select configuracion):", error);
    throw error;
  }

  return data;
}

export async function guardarConfiguracion({ dashboard, actividad }) {
  const fila = {
    id: ID_APP,
    dashboard: dashboard || {},
    actividad: actividad || [],
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(TABLA)
    .upsert(fila, { onConflict: "id" })
    .select()
    .maybeSingle();

  if (error) {
    console.error("SUPABASE ERROR (upsert configuracion):", error);
    throw error;
  }

  return data;
}

export default {
  obtenerConfiguracion,
  guardarConfiguracion,
};
