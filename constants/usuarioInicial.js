export const usuarioInicial = {
  nombre: "",
  usuario: "",
  email: "",
  password: "",
  rol: "Usuario",
  departamento: "",
  activo: true,

  // Controla si el usuario VE cada página en el menú y puede entrar a ella.
  permisos: {
    dashboard: true,
    otif: false,
    incidencias: false,
    reclamaciones: false,
    proveedores: false,
    auditorias: false,
    mejoras: false,
    formacion: false,
    satisfaccion: false,
    costes: false,
    configuracion: false,
  },

  // Controla si, dentro de una página a la que ya tiene acceso, el
  // usuario puede crear/editar/borrar registros, o solo consultarlos.
  // Una página no marcada aquí se muestra en modo solo lectura aunque
  // el usuario tenga permiso de "ver" esa página.
  permisosEdicion: {
    otif: false,
    incidencias: false,
    reclamaciones: false,
    proveedores: false,
    auditorias: false,
    mejoras: false,
    formacion: false,
    satisfaccion: false,
    procedimientos: false,
  },
};

// Lista usada por la pantalla de Configuración para pintar la matriz
// Ver / Editar de cada usuario. "editable: false" son páginas que no
// tienen alta/edición de registros (solo lectura por naturaleza).
export const MODULOS_PERMISOS = [
  { clave: "dashboard", etiqueta: "Panel Principal", editable: false },
  { clave: "otif", etiqueta: "OTIF", editable: true },
  { clave: "incidencias", etiqueta: "Incidencias", editable: true },
  { clave: "reclamaciones", etiqueta: "Reclamaciones", editable: true },
  { clave: "proveedores", etiqueta: "Proveedores", editable: true },
  { clave: "auditorias", etiqueta: "Auditorías", editable: true },
  { clave: "satisfaccion", etiqueta: "Satisfacción Cliente", editable: true },
  { clave: "mejoras", etiqueta: "Mejoras", editable: true },
  { clave: "formacion", etiqueta: "Formación", editable: true },
  { clave: "procedimientos", etiqueta: "Procedimientos", editable: true },
  { clave: "costes", etiqueta: "Coste No Calidad", editable: false },
  { clave: "configuracion", etiqueta: "Configuración", editable: false },
];