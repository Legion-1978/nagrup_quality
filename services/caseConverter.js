// services/caseConverter.js
//
// La app trabaja internamente en camelCase (numeroIncidencia,
// fechaCreacion...) pero las columnas de Postgres/Supabase se crean
// en snake_case (numero_incidencia, fecha_creacion...), que es la
// convención estándar en SQL y evita tener que usar comillas dobles
// en cada columna.
//
// Estas funciones convierten SOLO las claves de nivel superior de un
// objeto. El contenido de arrays/objetos anidados (historial,
// comentarios, evidencias, permisos...) se guarda tal cual en
// columnas jsonb y NO se toca, porque esos datos nunca se consultan
// campo a campo desde SQL.

export const aSnakeCase = (texto) =>
  texto.replace(/[A-Z]/g, (letra) => `_${letra.toLowerCase()}`);

export const aCamelCase = (texto) =>
  texto.replace(/_([a-zA-Z0-9])/g, (_, letra) => letra.toUpperCase());

// camelCase (app) -> snake_case (Supabase). Usado antes de insert/update.
export const objetoASnakeCase = (obj = {}) => {
  const resultado = {};

  Object.keys(obj).forEach((clave) => {
    resultado[aSnakeCase(clave)] = obj[clave];
  });

  return resultado;
};

// snake_case (Supabase) -> camelCase (app). Usado al leer filas.
export const objetoACamelCase = (obj = {}) => {
  const resultado = {};

  Object.keys(obj).forEach((clave) => {
    resultado[aCamelCase(clave)] = obj[clave];
  });

  return resultado;
};

export const listaACamelCase = (lista = []) =>
  lista.map(objetoACamelCase);
