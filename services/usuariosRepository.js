import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('usuarios', 'id');

export const obtenerUsuarios = repo.obtenerTodos;
export const guardarUsuario = repo.insertar;
export const actualizarUsuario = repo.actualizar;
export const eliminarUsuario = repo.eliminar;
export const reemplazarUsuarios = repo.reemplazarTodos;

export default repo;
