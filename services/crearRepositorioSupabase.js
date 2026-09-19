import { supabase } from "./supabase";
import { objetoASnakeCase, listaACamelCase } from "./caseConverter";
import {
  registroFechasASql,
  listaFechasAUI,
} from "../utils/fechas";

export function crearRepositorioSupabase(nombreTabla, campoId = "id") {
  async function obtenerTodos() {
    const { data, error } = await supabase
      .from(nombreTabla)
      .select("*")
      .order(campoId, { ascending: true });

    if (error) {
      console.error(`SUPABASE ERROR (select ${nombreTabla}):`, error);
      throw error;
    }

    return listaFechasAUI(listaACamelCase(data || []));
  }

  async function insertar(registro) {
    const registroDB = objetoASnakeCase(registroFechasASql(registro));

    const { data, error } = await supabase
      .from(nombreTabla)
      .insert([registroDB])
      .select();

    if (error) {
      console.error(`SUPABASE ERROR (insert ${nombreTabla}):`, error);
      throw error;
    }

    return listaFechasAUI(listaACamelCase(data || []));
  }

  async function actualizar(idValor, datos) {
    const datosDB = objetoASnakeCase(registroFechasASql(datos));

    const { data, error } = await supabase
      .from(nombreTabla)
      .update(datosDB)
      .eq(campoId, idValor)
      .select();

    if (error) {
      console.error(`SUPABASE ERROR (update ${nombreTabla}):`, error);
      throw error;
    }

    return listaFechasAUI(listaACamelCase(data || []));
  }

  async function eliminar(idValor) {
    const { error } = await supabase
      .from(nombreTabla)
      .delete()
      .eq(campoId, idValor);

    if (error) {
      console.error(`SUPABASE ERROR (delete ${nombreTabla}):`, error);
      throw error;
    }

    return true;
  }

  async function reemplazarTodos(listaNueva = []) {
    const { error: errorDelete } = await supabase
      .from(nombreTabla)
      .delete()
      .not(campoId, "is", null);

    if (errorDelete) {
      console.error(
        `SUPABASE ERROR (delete-all ${nombreTabla}):`,
        errorDelete
      );
      throw errorDelete;
    }

    if (!listaNueva.length) {
      return [];
    }

    const filasDB = listaNueva.map((item) =>
      objetoASnakeCase(registroFechasASql(item))
    );

    const { data, error } = await supabase
      .from(nombreTabla)
      .insert(filasDB)
      .select();

    if (error) {
      console.error(`SUPABASE ERROR (insert-all ${nombreTabla}):`, error);
      throw error;
    }

    return listaFechasAUI(listaACamelCase(data || []));
  }

  return {
    obtenerTodos,
    insertar,
    actualizar,
    eliminar,
    reemplazarTodos,
  };
}
