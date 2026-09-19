import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('incidencias', 'id');

export const obtenerIncidencias = repo.obtenerTodos;
export const guardarIncidencia = repo.insertar;
export const actualizarIncidencia = repo.actualizar;
export const eliminarIncidencia = repo.eliminar;
export const reemplazarIncidencias = repo.reemplazarTodos;

export default repo;
