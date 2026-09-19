import { crearRepositorioSupabase } from './crearRepositorioSupabase';

const repo = crearRepositorioSupabase('proveedores_nc', 'id');

export const obtenerNCProveedores = repo.obtenerTodos;
export const guardarNCProveedor = repo.insertar;
export const actualizarNCProveedor = repo.actualizar;
export const eliminarNCProveedor = repo.eliminar;
export const reemplazarNCProveedores = repo.reemplazarTodos;

export default repo;
