import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('entregas_otif', 'id');

export const obtenerEntregasOTIF = repo.obtenerTodos;
export const guardarEntregaOTIF = repo.insertar;
export const actualizarEntregaOTIF = repo.actualizar;
export const eliminarEntregaOTIF = repo.eliminar;
export const reemplazarEntregasOTIF = repo.reemplazarTodos;

export default repo;
