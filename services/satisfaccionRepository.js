import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('satisfaccion_clientes', 'id');

export const obtenerSatisfaccion = repo.obtenerTodos;
export const guardarSatisfaccion = repo.insertar;
export const actualizarSatisfaccion = repo.actualizar;
export const eliminarSatisfaccion = repo.eliminar;
export const reemplazarSatisfaccion = repo.reemplazarTodos;

export default repo;
