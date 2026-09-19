import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('procedimientos', 'id');

export const obtenerProcedimientos = repo.obtenerTodos;
export const guardarProcedimiento = repo.insertar;
export const actualizarProcedimiento = repo.actualizar;
export const eliminarProcedimiento = repo.eliminar;
export const reemplazarProcedimientos = repo.reemplazarTodos;

export default repo;
