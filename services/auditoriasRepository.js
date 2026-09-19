import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('auditorias', 'id');

export const obtenerAuditorias = repo.obtenerTodos;
export const guardarAuditoria = repo.insertar;
export const actualizarAuditoria = repo.actualizar;
export const eliminarAuditoria = repo.eliminar;
export const reemplazarAuditorias = repo.reemplazarTodos;

export default repo;
