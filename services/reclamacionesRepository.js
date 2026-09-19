import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('reclamaciones_clientes', 'id');

export const obtenerReclamaciones = repo.obtenerTodos;
export const guardarReclamacion = repo.insertar;
export const actualizarReclamacion = repo.actualizar;
export const eliminarReclamacion = repo.eliminar;
export const reemplazarReclamaciones = repo.reemplazarTodos;

export default repo;
