// services/contadoresRepository.js
//
// Genera el siguiente número de una serie (REC26001, IN26001...)
// llamando a la función SQL "siguiente_correlativo", que hace el
// incremento de forma atómica en la base de datos (INSERT ... ON
// CONFLICT ... DO UPDATE). Así, aunque dos personas den de alta un
// registro a la vez desde dos sitios distintos, nunca pueden recibir
// el mismo número — algo que con el contador local (AsyncStorage)
// no se podía garantizar.

import { supabase } from './supabase';

export async function obtenerSiguienteCorrelativo(prefijo, anio) {
  const { data, error } = await supabase.rpc(
    'siguiente_correlativo',
    {
      prefijo_input: prefijo,
      anio_input: anio,
    }
  );

  if (error) {
    console.error(
      'SUPABASE ERROR (siguiente_correlativo):',
      error
    );
    throw error;
  }

  // La función SQL devuelve directamente el número entero.
  return data;
}
