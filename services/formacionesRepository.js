import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('formaciones', 'id');

export const obtenerFormaciones = repo.obtenerTodos;
export const guardarFormacion = repo.insertar;
export const actualizarFormacion = repo.actualizar;
export const eliminarFormacion = repo.eliminar;
export const reemplazarFormaciones = repo.reemplazarTodos;

export default repo;
