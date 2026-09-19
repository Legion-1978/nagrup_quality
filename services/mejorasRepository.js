import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('mejoras', 'id');

export const obtenerMejoras = repo.obtenerTodos;
export const guardarMejora = repo.insertar;
export const actualizarMejora = repo.actualizar;
export const eliminarMejora = repo.eliminar;
export const reemplazarMejoras = repo.reemplazarTodos;

export default repo;
