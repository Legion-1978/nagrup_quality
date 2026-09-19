// services/sincronizarLista.js
//
// Todas las screens (IncidenciasScreen, AuditoriasScreen...) trabajan
// igual: calculan la lista COMPLETA ya modificada (con el nuevo
// registro añadido, editado o quitado) y llaman a
// actualizarIncidencias(nuevaLista), actualizarAuditorias(nuevaLista),
// etc. Antes de esto, esas funciones de contexto solo hacían
// setState (memoria, se perdía al recargar).
//
// Esta función compara la lista anterior con la nueva, deduce qué
// registros son nuevos (insert), cuáles han cambiado (update) y
// cuáles han desaparecido (delete), y llama al repositorio de
// Supabase correspondiente para cada caso — sin tener que tocar ni
// una screen.

export async function sincronizarLista({
  listaAnterior = [],
  listaNueva = [],
  repositorio,
  campoId = 'id',
}) {
  const anterioresPorId = new Map(
    listaAnterior.map((item) => [item[campoId], item])
  );

  const nuevosPorId = new Map(
    listaNueva.map((item) => [item[campoId], item])
  );

  // 1) Registros que ya no están en la lista nueva -> borrar
  const eliminaciones = listaAnterior
    .filter((item) => !nuevosPorId.has(item[campoId]))
    .map((item) => repositorio.eliminar(item[campoId]));

  // 2) Registros nuevos o modificados -> insertar / actualizar
  const escrituras = listaNueva.map((item) => {
    const anterior = anterioresPorId.get(item[campoId]);

    if (!anterior) {
      return repositorio.insertar(item);
    }

    if (JSON.stringify(anterior) === JSON.stringify(item)) {
      // Sin cambios reales: nos ahorramos la llamada a Supabase.
      return Promise.resolve(null);
    }

    return repositorio.actualizar(item[campoId], item);
  });

  await Promise.all([...eliminaciones, ...escrituras]);
}
