import { supabase } from "./supabase";


// ============================================================
// NAGRUP QUALITY
// SERVICIO: authAdminService.js
// ============================================================
//
// Gestiona operaciones administrativas relacionadas
// con Supabase Auth.
//
// IMPORTANTE:
//
// Este archivo utiliza exclusivamente el cliente público
// de Supabase.
//
// NUNCA debe contener:
//
// - service_role
// - secret key
// - claves administrativas
//
// Las operaciones privilegiadas se realizan dentro de
// Edge Functions de Supabase.
//
// ============================================================


// ============================================================
// EDGE FUNCTIONS
// ============================================================
//
// IMPORTANTE:
//
// Estos valores deben coincidir con el SLUG REAL de las
// funciones desplegadas en Supabase.
//
// ============================================================

const FUNCION_CREAR_USUARIO =
  "bright-endpoint";

const FUNCION_RESTABLECER_PASSWORD =
  "restablecer-password";

const FUNCION_ELIMINAR_USUARIO =
  "eliminar-usuario";

const FUNCION_ACTUALIZAR_USUARIO = 
  "actualizar-usuario";

// ============================================================
// FUNCION AUXILIAR
// COMPROBAR SESION AUTH
// ============================================================

const comprobarSesionAdministrador = async () => {
  const {
    data,
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error(
      "Error obteniendo sesión de Supabase Auth:",
      error
    );

    throw new Error(
      "No se pudo comprobar la sesión del administrador"
    );
  }

  const session =
    data?.session;

  if (
    !session ||
    !session.user ||
    !session.access_token
  ) {
    throw new Error(
      "La sesión del administrador no está disponible. Cierra sesión y vuelve a iniciar sesión."
    );
  }

  return session;
};


// ============================================================
// FUNCION AUXILIAR
// OBTENER MENSAJE DE ERROR DE UNA EDGE FUNCTION
// ============================================================

const procesarErrorFuncion = async (
  error,
  mensajePorDefecto
) => {
  console.error(
    "Error invocando Edge Function:",
    error
  );

  if (
    error?.context &&
    typeof error.context.json ===
      "function"
  ) {
    try {
      const detalle =
        await error.context.json();

      console.error(
        "Detalle devuelto por la Edge Function:",
        detalle
      );

      if (detalle?.error) {
        throw new Error(
          detalle.error
        );
      }
    } catch (detalleError) {
      if (
        detalleError instanceof Error
      ) {
        throw detalleError;
      }
    }
  }

  throw new Error(
    error?.message ||
      mensajePorDefecto
  );
};


// ============================================================
// CREAR USUARIO COMPLETO
// ============================================================
//
// La Edge Function bright-endpoint realizará ahora:
//
//   1. Verificar sesión.
//   2. Verificar Administrador.
//   3. Crear identidad en Supabase Auth.
//   4. Crear perfil en public.usuarios.
//   5. Si falla el perfil, eliminar la identidad Auth creada.
//   6. Devolver el usuario creado.
//
// El cliente NO realiza INSERT directo en public.usuarios.
//
// ============================================================

export const crearUsuarioAuth = async ({
  id,
  nombre,
  usuario,
  email,
  password,
  passwordHash,
  departamento = "",
  rol = "Usuario",
  activo = true,
  permisos = {},
  permisosEdicion = {},
}) => {
  // =========================================================
  // 1. NORMALIZAR DATOS
  // =========================================================

  const nombreLimpio =
    String(nombre || "").trim();

  const usuarioLimpio =
    String(usuario || "").trim();

  const emailLimpio =
    String(email || "")
      .trim()
      .toLowerCase();


  // =========================================================
  // 2. VALIDACIONES
  // =========================================================

  if (!id) {
    throw new Error(
      "Falta el identificador interno del usuario"
    );
  }

  if (!nombreLimpio) {
    throw new Error(
      "El nombre es obligatorio"
    );
  }

  if (!usuarioLimpio) {
    throw new Error(
      "El nombre de usuario es obligatorio"
    );
  }

  if (
    !/^[a-zA-Z0-9._-]+$/.test(
      usuarioLimpio
    )
  ) {
    throw new Error(
      "El nombre de usuario contiene caracteres no permitidos"
    );
  }

  if (!emailLimpio) {
    throw new Error(
      "El correo electrónico es obligatorio"
    );
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      emailLimpio
    )
  ) {
    throw new Error(
      "El formato del correo electrónico no es válido"
    );
  }

  if (
    !password ||
    password.length < 6
  ) {
    throw new Error(
      "La contraseña debe tener al menos 6 caracteres"
    );
  }

  if (!passwordHash) {
    throw new Error(
      "No se pudo generar el hash de compatibilidad"
    );
  }


  // =========================================================
  // 3. COMPROBAR SESION DEL ADMINISTRADOR
  // =========================================================

  await comprobarSesionAdministrador();


  // =========================================================
  // 4. LLAMAR A bright-endpoint
  // =========================================================
  //
  // Todos los datos necesarios para crear public.usuarios
  // viajan ahora a la Edge Function.
  //
  // =========================================================

  const {
    data,
    error,
  } =
    await supabase.functions.invoke(
      FUNCION_CREAR_USUARIO,
      {
        body: {
          id,

          nombre:
            nombreLimpio,

          usuario:
            usuarioLimpio,

          email:
            emailLimpio,

          password,

          passwordHash,

          departamento:
            departamento || "",

          rol:
            rol || "Usuario",

          activo:
            activo !== false,

          permisos:
            permisos || {},

          permisosEdicion:
            permisosEdicion || {},

          debeCambiarPassword:
            true,
        },
      }
    );


  // =========================================================
  // 5. CONTROLAR ERROR DE EDGE FUNCTION
  // =========================================================

  if (error) {
    await procesarErrorFuncion(
      error,
      "No se pudo crear el usuario"
    );
  }


  // =========================================================
  // 6. COMPROBAR RESPUESTA
  // =========================================================

  if (!data) {
    throw new Error(
      "La Edge Function no devolvió una respuesta"
    );
  }

  if (data.ok !== true) {
    console.error(
      `Error devuelto por ${FUNCION_CREAR_USUARIO}:`,
      data
    );

    throw new Error(
      data.error ||
        "No se pudo crear el usuario"
    );
  }


  // =========================================================
  // 7. COMPROBAR authId
  // =========================================================

  if (!data.authId) {
    console.error(
      "La Edge Function no devolvió authId:",
      data
    );

    throw new Error(
      "Supabase Auth no devolvió el identificador del usuario"
    );
  }


  // =========================================================
  // 8. DEVOLVER RESULTADO
  // =========================================================

  return {
    ok: true,

    id:
      data.id ||
      id,

    authId:
      data.authId,

    nombre:
      data.nombre ||
      nombreLimpio,

    usuario:
      data.usuario ||
      usuarioLimpio,

    email:
      data.email ||
      emailLimpio,

    departamento:
      data.departamento ||
      departamento ||
      "",

    rol:
      data.rol ||
      rol ||
      "Usuario",

    activo:
      data.activo !== false,

    debeCambiarPassword:
      data.debeCambiarPassword !== false,

    permisos:
      data.permisos ||
      permisos ||
      {},

    permisosEdicion:
      data.permisosEdicion ||
      permisosEdicion ||
      {},
  };
};


// ============================================================
// RESTABLECER CONTRASEÑA EN SUPABASE AUTH
// ============================================================
//
// Utilizada cuando un administrador establece una nueva
// contraseña provisional para un usuario.
//
// Flujo:
//
// Administrador
//      |
//      v
// restablecerPasswordAuth()
//      |
//      v
// Edge Function
//      |
//      v
// comprobar Administrador
//      |
//      v
// actualizar contraseña en Supabase Auth
//      |
//      v
// debe_cambiar_password = true
//
// ============================================================

export const restablecerPasswordAuth = async ({
  authId,
  password,
}) => {

  // =========================================================
  // 1. VALIDAR authId
  // =========================================================

  const authIdLimpio =
    String(
      authId || ""
    ).trim();

  if (!authIdLimpio) {
    throw new Error(
      "El usuario no está vinculado con Supabase Auth"
    );
  }


  // =========================================================
  // 2. VALIDAR CONTRASEÑA
  // =========================================================

  if (
    !password ||
    password.length < 6
  ) {
    throw new Error(
      "La contraseña debe tener al menos 6 caracteres"
    );
  }


  // =========================================================
  // 3. COMPROBAR SESION ADMINISTRADOR
  // =========================================================

  await comprobarSesionAdministrador();


  // =========================================================
  // 4. LLAMAR EDGE FUNCTION
  // =========================================================

  const {
    data,
    error,
  } =
    await supabase.functions.invoke(
      FUNCION_RESTABLECER_PASSWORD,
      {
        body: {
          authId:
            authIdLimpio,

          password,
        },
      }
    );


  // =========================================================
  // 5. CONTROLAR ERROR
  // =========================================================

  if (error) {
    await procesarErrorFuncion(
      error,
      "No se pudo restablecer la contraseña"
    );
  }


  // =========================================================
  // 6. COMPROBAR RESPUESTA
  // =========================================================

  if (!data) {
    throw new Error(
      "La Edge Function no devolvió una respuesta"
    );
  }


  if (data.ok !== true) {
    console.error(
      `Error devuelto por ${FUNCION_RESTABLECER_PASSWORD}:`,
      data
    );

    throw new Error(
      data.error ||
        "No se pudo restablecer la contraseña"
    );
  }


  // =========================================================
  // 7. DEVOLVER RESULTADO
  // =========================================================

  return {
    ok: true,

    authId:
      data.authId ||
      authIdLimpio,

    debeCambiarPassword:
      data.debeCambiarPassword !== false,
  };
};

// ============================================================
// ELIMINAR USUARIO DE SUPABASE AUTH
// ============================================================
//
// Elimina de forma segura un usuario mediante la Edge Function:
//
//   eliminar-usuario
//
// La Edge Function se encarga de:
//
//   1. Validar la sesión.
//   2. Comprobar que quien llama es Administrador.
//   3. Comprobar que el Administrador está activo.
//   4. Impedir la autoeliminación.
//   5. Proteger el usuario admin.
//   6. Eliminar la identidad de Supabase Auth.
//   7. Eliminar el perfil de public.usuarios.
//
// ============================================================

export const eliminarUsuarioAuth = async ({
  authId,
}) => {
  // =========================================================
  // 1. VALIDAR authId
  // =========================================================

  const authIdLimpio =
    String(
      authId || ""
    ).trim();

  if (!authIdLimpio) {
    throw new Error(
      "El usuario no está vinculado con Supabase Auth"
    );
  }


  // =========================================================
  // 2. COMPROBAR SESION DEL ADMINISTRADOR
  // =========================================================

  await comprobarSesionAdministrador();


  // =========================================================
  // 3. LLAMAR EDGE FUNCTION
  // =========================================================

  const {
    data,
    error,
  } =
    await supabase.functions.invoke(
      FUNCION_ELIMINAR_USUARIO,
      {
        body: {
          authId:
            authIdLimpio,
        },
      }
    );


  // =========================================================
  // 4. CONTROLAR ERROR
  // =========================================================

  if (error) {
    await procesarErrorFuncion(
      error,
      "No se pudo eliminar el usuario"
    );
  }


  // =========================================================
  // 5. COMPROBAR RESPUESTA
  // =========================================================

  if (!data) {
    throw new Error(
      "La Edge Function no devolvió una respuesta"
    );
  }


  // =========================================================
  // 6. COMPROBAR RESULTADO
  // =========================================================

  if (data.ok !== true) {
    console.error(
      `Error devuelto por ${FUNCION_ELIMINAR_USUARIO}:`,
      data
    );

    throw new Error(
      data.error ||
        "No se pudo eliminar el usuario"
    );
  }


  // =========================================================
  // 7. DEVOLVER RESULTADO
  // =========================================================

  return {
    ok: true,

    authId:
      data.authId ||
      authIdLimpio,

    usuario:
      data.usuario ||
      null,
  };
};

// ============================================================
// ACTUALIZAR USUARIO EN public.usuarios
// ============================================================
//
// Flujo:
// 1. Validar sesión administrador.
// 2. Invocar Edge Function actualizar-usuario.
// 3. Edge Function valida rol y estado.
// 4. Actualiza perfil en public.usuarios.
// 5. Devuelve usuario actualizado.
//
// ============================================================

export const actualizarUsuarioAuth = async ({ id, updateData }) => {
  // 1. Validar ID
  const idSeguro = Number(id);
  if (!Number.isSafeInteger(idSeguro) || idSeguro <= 0) {
    throw new Error("Identificador interno no válido");
  }

  // 2. Validar sesión administrador
  await comprobarSesionAdministrador();

  // 3. Invocar Edge Function
  const { data, error } = await supabase.functions.invoke(
    FUNCION_ACTUALIZAR_USUARIO,
    {
      body: {
        id: idSeguro,
        updateData: updateData || {},
      },
    }
  );

  // 4. Controlar error
  if (error) {
    await procesarErrorFuncion(error, "No se pudo actualizar el usuario");
  }

  if (!data) {
    throw new Error("La Edge Function no devolvió respuesta");
  }

  if (data.ok !== true) {
    console.error(`Error devuelto por ${FUNCION_ACTUALIZAR_USUARIO}:`, data);
    throw new Error(data.error || "No se pudo actualizar el usuario");
  }

  // 5. Devolver resultado
  return {
    ok: true,
    usuario: data.usuario,
  };
};

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default {
  crearUsuarioAuth,
  restablecerPasswordAuth,
  eliminarUsuarioAuth,
  actualizarUsuarioAuth, // 🔹 añadida
};